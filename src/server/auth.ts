import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  // type DefaultSession,
} from "next-auth";
import authOptions from "../pages/api/auth/[...nextauth]"
// import DiscordProvider from "next-auth/providers/discord";
// import GithubProvider, { type GithubProfile } from "next-auth/providers/github";
// import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

// i found out that we don't need to store the crendentials in the session since we are using jwt
// we can just query the db for the user info when we need it
// so i commented out this section as well

// declare module "next-auth" {
//   type UserRole = string | null;

//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       role: UserRole;
//       accessToken: string;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }


// this is is pretty much the same as the [...nextauth].ts file so i commneted it out since it wasnt working
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     session: async ({ session, user, token }) => {
//       if (session.user) {
//         session.user.id = user.id;
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//         session.user.role = user.role;
//         session.user.accessToken = token.accessToken as string;
//       }
//       return session;
//     },
//     jwt: async ({token, account}) => {
//       if (account) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//   },
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID as string,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
//     }),
//     GithubProvider<GithubProfile>({
//       id: "github",
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     }),
//     GoogleProvider<GoogleProfile>({
//       id: "google",
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     // Credentials authentication provider...
//     Credentials({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: {
//             username: credentials?.username,
//           },
//         });

//         if (!user) {
//           throw new Error("No user found");
//         }

//         // compare password with db password not using bcrypt
//         if (user.password !== credentials?.password) {
//           throw new Error("Invalid password");
//         }

//         return user;
//       },
//     }),
//     /**
//      * ...add more providers here.
//      *
//      * Most other providers require a bit more work than the Discord provider. For example, the
//      * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//      * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//      *
//      * @see https://next-auth.js.org/providers/github
//      */
//   ],
// };

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions as NextAuthOptions);
};
