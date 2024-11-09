import { getServerSession } from "#auth";
import { bookmarkcategory, user } from "~/drizzle/schema";
import { db } from "~/utils/db";
import { and, eq } from "drizzle-orm";

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
        const userID = await db
            .select({ 
                id: user.id,
                name: user.name
             })
            .from(user)
            .where(eq(user.email, email));
        console.log(userID)

        if (!userID) {
            throw createError({
                statusCode: 404,
                statusMessage: "User not found",
            });
        }

        const listOfCategory = await db.query.bookmarkcategory.findMany({
            where: and(
                eq(bookmarkcategory.userId, userID[0].id),
            ),
        });
        if (listOfCategory.length === 0) {
            return "";
        }

        return listOfCategory;
   
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        });
    }
});
