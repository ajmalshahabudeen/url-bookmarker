import { getServerSession } from "#auth";
import { bookmark, bookmarkcategory, user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };

  const query = getQuery(event);
  let { path } = query as { path: string };
  if (path.endsWith("/")) {
    const newPath = path.slice(0, -1);
    path = newPath;
  }
  const pathArr = path.split("/");
  const categoryName = pathArr[pathArr.length - 1];
  let CatPath = pathArr.pop() && pathArr.join("/");
  if (!CatPath) {
    CatPath = "/dashboard";
  }
  console.log({ categoryName, pathArr, CatPath });

  // console.log(session)

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
    const categoryID = await db
      .select({ id: bookmarkcategory.id })
      .from(bookmarkcategory)
      .where(
        and(
          eq(bookmarkcategory.categoryName, categoryName),
          eq(bookmarkcategory.categoryPath, CatPath),
          eq(bookmarkcategory.userId, userID[0].id)
        )
      );

    const listOfBookmarks = await db.query.bookmark.findMany({
      where: and(
        eq(bookmark.userId, userID[0].id),
        eq(bookmark.bookmarkedCategory, categoryID[0].id)
      ),
    });
    if (!listOfBookmarks) {
      return "No bookmarks found";
    }
    return listOfBookmarks;
    // throw createError({
    //   statusCode: 500,
    //   statusMessage: 'Internal Server Error',
    // })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }

  return "Hello Nitro";
});
