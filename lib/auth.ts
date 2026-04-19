import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        try {
          const user = await getUserByEmail(email);
          if (!user) return null;

          const valid = await bcrypt.compare(password, user.password_hash);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name || undefined,
            isAdmin: Boolean(
              (user as unknown as { is_admin?: boolean }).is_admin
            ),
          } as unknown as { id: string; email: string; name?: string };
        } catch (e) {
          console.error("Auth error:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as { id: string; isAdmin?: boolean };
        token.id = u.id;
        token.isAdmin = !!u.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const su = session.user as unknown as {
          id?: string;
          isAdmin?: boolean;
        };
        if (token.id) su.id = token.id as string;
        su.isAdmin = !!(token as unknown as { isAdmin?: boolean }).isAdmin;
      }
      return session;
    },
  },
});
