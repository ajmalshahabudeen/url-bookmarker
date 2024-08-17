import { NuxtAuthHandler } from "#auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/utils/db";
import { user } from "~/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.AUTH_SECRET as string,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/",
    verifyRequest: "/login",
  },
  providers: [
    (Google as any).default({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    (Github as any).default({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    (Credentials as any).default({
      allowDangerousEmailAccountLinking: true,
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("Invalid credentials");
          return null;
        }
        console.log("checking credentials");
        return await findUserByEmail(credentials.email, credentials.password);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    /* on before signin */
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    /* on redirect to another url */
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    /* on session retrival */
    async session({ session, user, token }) {
      return session;
    },
    /* on JWT token creation or mutation */
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
});

const findUserByEmail = async (email: string, pasword: string) => {
  const userData = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!userData) {
    console.log("User not found");
    return null;
  } else {
    const userPasswordHash = userData?.password as string;
    const passwordValidity = bcrypt.compareSync(pasword, userPasswordHash);

    if (!passwordValidity) {
      console.log("Invalid password");
      return null;
    } else {
      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.image,
      };
    }
  }
};
