import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      companyId?: string | null;
      isBanned?: boolean;
      image?: string | null;
    } & DefaultSession["user"];
    error?: string;
  }
  interface User extends DefaultUser {
    role?: UserRole;
    image?: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    image?: string | null;
    companyId?: string | null;
    isBanned?: boolean;
    sub?: string;
  }
}
