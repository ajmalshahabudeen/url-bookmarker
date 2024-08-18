import { getServerSession } from "#auth";
import { bookmarkcategory, user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };

  const body = await readBody(event);
  const { categoryName, path } = body as { categoryName: string; path: string };

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
      .insert(bookmarkcategory)
      .values({
        id: crypto.randomUUID(),
        categoryName: categoryName,
        categoryPath: path,
        userId: userID[0].id,
      })
      .returning({ id: bookmarkcategory.id });

    return categoryID;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
