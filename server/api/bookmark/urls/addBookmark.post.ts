import { getServerSession } from "#auth";
import { bookmark, user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };

  const body = await readBody(event);
  const { categoryPath, bookmarkUrl } = body as { categoryPath: string; bookmarkUrl: string };
  console.log({ categoryPath, bookmarkUrl });
  let pathArr = categoryPath.split('/');
  categoryPath.endsWith('/') && pathArr.pop(); 
  const categoryName = pathArr[pathArr.length - 1];
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

    const categoryID = await db
      .insert(bookmark)
      .values({
        id: crypto.randomUUID(),
        bookmarkedCategory: categoryName,
        bookmarkedUrl: newBookmarkUrl,
        userId: userID[0].id,
      })
      .returning({ id: bookmark.id });

    return categoryID;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
