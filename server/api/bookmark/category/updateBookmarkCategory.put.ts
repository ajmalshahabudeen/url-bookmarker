import { getServerSession } from "#auth";
import { bookmarkcategory, user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };

  const query = getQuery(event);
  const body = await readBody(event);
  const { id } = query as { id: string };
  const { categoryName } = body as { categoryName: string };
  
  console.log({ id });
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

    const UpdatedID = await db
      .update(bookmarkcategory)
      .set({ categoryName: categoryName })
      .where(eq(bookmarkcategory.id, id))
      .returning({ UpdatedID: bookmarkcategory.id });

    return UpdatedID;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
