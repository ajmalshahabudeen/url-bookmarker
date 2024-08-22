import { getServerSession } from "#auth";
import { eq } from "drizzle-orm";
import { user } from "~/drizzle/schema";
import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const passwordExists = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (passwordExists?.password === null) {
      return false;
    }
    console.log(passwordExists);
    return true;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
