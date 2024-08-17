import { NuxtAuthHandler } from "#auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/utils/db";
import { user } from '~/drizzle/schema';
import { eq } from "drizzle-orm";

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
        console.log("Login success");

        const user = await findUserByEmail(credentials.email, credentials.password);

        return {
          email: credentials.email,
          name: "Test",
          image:
            "https://github.com/withastro/astro/blob/main/assets/withastro.jpg?raw=true",
        };
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
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});

const findUserByEmail = async (email: string, pasword: string) => {
  const userData = await db.query.user.findFirst({
    where: eq(user.email, email),
  })
}