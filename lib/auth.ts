import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./db";
import { normalizeEmail } from "./email";

// Pre-computed bcrypt hash of a random unguessable string. Used to equalize
// the timing of failed logins: if the email is unknown we still run one
// bcrypt.compare against this hash so a remote attacker can't distinguish
// "email does not exist" from "email exists but wrong password" by timing.
const DUMMY_PASSWORD_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8o6FQG3HYQ8nGjGqPkQpQ8sGrlFqEu";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    // Sessions expire after 7 days. A stolen token is only usable for 7 days,
    // and we renew it on each request within that window.
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
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
        const email = normalizeEmail(String(credentials.email));
        const password = String(credentials.password);
        if (!email) return null;

        try {
          const user = await getUserByEmail(email);
          if (!user) {
            // Constant-time branch: run a dummy bcrypt.compare so the absence
            // of a user takes roughly the same time as a wrong password.
            await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
            return null;
          }

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
        } catch {
          // Do not leak DB error details. Fail closed.
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
