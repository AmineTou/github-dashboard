import type { NextAuthOptions } from "next-auth";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile }) {
      const gh = profile as GithubProfile | null;
      if (gh?.login) token.username = gh.login;
      return token;
    },
    async session({ session, token }) {
      const username =
        token.username ??
        (session.user?.email ? session.user.email.split("@")[0] : "me");
      session.user = {
        ...session.user!,
        username,
      };
      return session;
    },
  },
};
