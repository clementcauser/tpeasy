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
      session.user.id = (token.user as User).id;
      session.user.companyId = (token.user as User).companyId;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, user };
      } else {
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
