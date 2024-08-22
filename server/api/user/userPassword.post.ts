import { getServerSession } from "#auth";
import { eq } from "drizzle-orm";
import { user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const { name, email } = session?.user as { name: string; email: string };
  const body = await readBody(event);
  const { password } = body as { password: string };
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
  const hashedPassword = bcrypt.hashSync(password, 10);

    await db.update(user).set({ password: hashedPassword }).where(eq(user.email, email));
    return true;
  } catch (error) {
    return false;
  }
});
