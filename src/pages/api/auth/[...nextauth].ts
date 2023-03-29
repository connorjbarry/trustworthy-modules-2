/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth from "next-auth";
import GithubProvider, { type GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import DiscordProvider, {
  type DiscordProfile,
} from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth authentication providers...
    DiscordProvider<DiscordProfile>({
      id: "discord",
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    GithubProvider<GithubProfile>({
      id: "github",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider<GoogleProfile>({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Credentials authentication provider...
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        credentials: { label: "Credentials", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials?.credentials },
              { username: credentials?.credentials },
            ],
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (user.password !== credentials?.password) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/signin",
  },
});
