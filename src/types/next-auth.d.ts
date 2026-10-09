import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      isDemoUser?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    isDemoUser?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    isDemoUser?: boolean;
  }
}
