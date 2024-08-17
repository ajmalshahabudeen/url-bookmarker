import { user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;
  console.log({ name, email, password });
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const emailExists = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email));
    if (emailExists.length > 0) {
      return {
        type: "error",
        message: "User already exists",
      };
    }

    const userData = await db
      .insert(user)
      .values({
        id: crypto.randomUUID(),
        name: name,
        email: email,
        password: hashedPassword,
      })
      .returning();
    if (!userData) {
      console.log("User not created, Database error");
      return {
        type: "error",
        message: "User not created, try again",
      };
    } else {
      console.log("User created");
      return {
        type: "success",
        message: "User created",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      type: "error",
      message: "User not created, try again",
    };
  }
});
