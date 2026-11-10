// src/auth.ts — single source of truth for Auth.js v5 config.
// Lives under src/ so it resolves through the "@/*" -> "./src/*" path mapping.

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // v5 picks up AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET from the LOCAL env file.
  // No adapter on purpose: sessions are JWTs and the signIn callback below owns
  // the users row. DrizzleAdapter would expect Auth.js's own user/account/
  // session tables, which this schema does not have.
  providers: [
    Google({
      // Google otherwise skips straight past the chooser once consent is granted,
      // which makes it look like nothing happened. Always offer the account list.
      authorization: { params: { prompt: "select_account" } },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // Persist the Google identity into our own users table. Runs before the
    // session is issued; returning false aborts the sign-in.
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return false;
      if (!profile?.sub || !profile.email) return false;

      const email = profile.email;
      const username = profile.name ?? email.split("@")[0];

      // Already linked? Keep the profile fields current — a Google account can
      // change its email, and google_sub is the stable key, not the address.
      const [linked] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.googleSub, profile.sub));

      if (linked) {
        await db.update(users).set({ email, username }).where(eq(users.id, linked.id));
        return true;
      }

      // Otherwise insert — and if a row for this email already exists (created
      // by the old /login form, or as an invited guest), adopt it by backfilling
      // google_sub rather than failing on users_email_unique.
      await db
        .insert(users)
        .values({ googleSub: profile.sub, username, email })
        .onConflictDoUpdate({
          target: users.email,
          set: { googleSub: profile.sub },
        });

      return true;
    },

    // Keep only the internal user id in the token. Role is deliberately absent:
    // it is read fresh from the DB so a role change takes effect immediately
    // instead of waiting for the token to expire.
    async jwt({ token, profile }) {
      // profile is only present on the initial sign-in; token.sub carries the
      // Google sub on subsequent refreshes.
      const googleSub = profile?.sub ?? token.sub;

      if (googleSub && token.uid === undefined) {
        const [row] = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.googleSub, googleSub));
        if (row) token.uid = row.id; // integer users.id, not Google's sub
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && typeof token.uid === "number") {
        session.user.id = String(token.uid);
      }
      return session;
    },
  },
});
