import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/config";

/**
 * Kimlik doğrulama yapılandırması (Auth.js / NextAuth v5).
 *
 * - Veritabanı (DATABASE_URL) yapılandırılmışsa kullanıcılar `User` tablosundaki
 *   bcrypt ile hashlenmiş parolaya göre doğrulanır.
 * - Veritabanı yapılandırılmamışsa (örn. yerel demo/sunum ortamı) uygulama,
 *   açıkça "Demo Kullanıcı" olarak işaretlenen tek bir demo hesabına izin verir.
 *   Bu, gerçek bir veritabanı bağlantısı varmış gibi davranmaz; oturum nesnesinde
 *   `isDemoUser: true` olarak işaretlenir ve arayüzde buna göre gösterilir.
 *
 * Oturumlar JWT stratejisiyle, httpOnly + imzalı çerezlerde güvenli şekilde saklanır.
 */

export const DEMO_LOGIN_EMAIL = "demo@kargovo.com";
export const DEMO_LOGIN_PASSWORD = "demo1234";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Parola", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        if (isDatabaseConfigured && db) {
          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.passwordHash || !user.isActive) return null;

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name ?? user.email,
            email: user.email,
            role: user.role,
            isDemoUser: false,
          };
        }

        // Veritabanı yapılandırılmamış: yalnızca açıkça belgelenmiş demo
        // hesabıyla girişe izin ver. Bu bilgiler README.md'de de yer alır.
        if (email === DEMO_LOGIN_EMAIL && password === DEMO_LOGIN_PASSWORD) {
          return {
            id: "demo-user",
            name: "Demo Kullanıcı",
            email: DEMO_LOGIN_EMAIL,
            role: "ADMIN",
            isDemoUser: true,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "OPERATOR";
        token.isDemoUser = Boolean((user as { isDemoUser?: boolean }).isDemoUser);
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) ?? "OPERATOR";
        session.user.isDemoUser = Boolean(token.isDemoUser);
      }
      return session;
    },
  },
});
