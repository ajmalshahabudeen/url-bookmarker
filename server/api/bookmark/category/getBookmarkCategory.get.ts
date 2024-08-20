import { getServerSession } from "#auth";
import { bookmarkcategory, user } from "~/drizzle/schema";
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
  // console.log(path);

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

    const listOfCategory = await db.query.bookmarkcategory.findMany({
      where: and(
        eq(bookmarkcategory.userId, userID[0].id),
        eq(bookmarkcategory.categoryPath, path)
      ),
    });
    if (listOfCategory.length === 0) {
      return "";
    }

    return listOfCategory;
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
