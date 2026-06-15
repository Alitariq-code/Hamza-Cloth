import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./mongodb";
import User from "@/models/User";

/**
 * Admin credentials auth backed by the `users` collection in MongoDB.
 * Passwords are stored as bcrypt hashes. Create an admin with `npm run create-admin`.
 * NextAuth issues a JWT session.
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await dbConnect();
          const user = await User.findOne({
            email: credentials.email.toLowerCase().trim(),
          }).lean();
          if (!user) return null;

          const ok = await bcrypt.compare(
            credentials.password,
            user.passwordHash,
          );
          if (!ok) return null;

          return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("authorize failed:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role || "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
