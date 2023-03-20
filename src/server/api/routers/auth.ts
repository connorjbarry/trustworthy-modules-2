import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().optional(),
        username: z.string().optional(),
        password: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
          username: input.username,
        },
      });

      if (!user) {
        throw new Error("No user found");
      }

      if (user.password !== input.password) {
        throw new Error("Invalid password");
      }

      return user;
    }),

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
          role: "USER",
        },
      });
      return user;
    }),
});
