import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ROUTES from "./constants/routes";
import { prisma } from "./db/prisma";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      companyId?: string | null;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: { signIn: ROUTES.signin },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.companyId = token.companyId as string;

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return { ...token, id: user.id, companyId: (user as User).companyId };
      } else {
        if (trigger === "update" && session?.companyId) {
          token.companyId = session.companyId;
        }

        return token;
      }
    },
    async redirect() {
      return ROUTES.dashboard;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});
