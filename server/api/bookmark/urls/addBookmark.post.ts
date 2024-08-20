import { getServerSession } from "#auth";
import { bookmark, bookmarkcategory, user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };

  const body = await readBody(event);
  const { categoryPath, bookmarkUrl } = body as {
    categoryPath: string;
    bookmarkUrl: string;
  };
  console.log({ categoryPath, bookmarkUrl });
  let pathArr = categoryPath.split("/");
  categoryPath.endsWith("/") && pathArr.pop();
  const newCategoryPath = pathArr.join("/");
  const categoryName = pathArr[pathArr.length - 1];
  let CatPath = pathArr.pop() && pathArr.join("/");
  if (!CatPath) {
    CatPath = "/dashboard";
  }
  console.log({ categoryName, pathArr, newCategoryPath, CatPath });
  // console.log(session)

  let newBookmarkUrl = bookmarkUrl;
  if (!bookmarkUrl.startsWith("http")) {
    newBookmarkUrl = "https://" + bookmarkUrl;
  }

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const userID = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email));
    // console.log(userID)

    if (!userID) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }
    let categoryID = await db
      .select({ id: bookmarkcategory.id })
      .from(bookmarkcategory)
      .where(
        and(
          eq(bookmarkcategory.categoryName, categoryName),
          eq(bookmarkcategory.categoryPath, CatPath),
          eq(bookmarkcategory.userId, userID[0].id)
        )
      );

    console.log("categoryID", categoryID);

    if (categoryID.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Category not found",
      });
    }

    const bookmarkID = await db
      .insert(bookmark)
      .values({
        id: crypto.randomUUID(),
        bookmarkedCategory: categoryID[0].id,
        bookmarkedUrl: newBookmarkUrl,
        userId: userID[0].id,
      })
      .returning({ id: bookmark.id });

    return bookmarkID;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
