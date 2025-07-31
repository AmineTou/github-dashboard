import "next-auth";
declare module "next-auth" {
  interface Session {
    user: NonNullable<Session["user"]> & {
      username: string; 
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
  }
}