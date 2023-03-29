import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: publicProcedure
    .input(
      z.object({
        email: z.string().optional().nullish(),
        username: z.string().optional().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          OR: [{ email: input.email }, { username: input.username }],
        },
      });
      return user;
    }),

  // for getting the list of all users
  getAllUsers: publicProcedure
    .query(async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany();
      return users;
    }),

  // for updating the user role
  updateUserRole: publicProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.string().nullish(),
      })
    )
    .mutation(async ({ctx, input}) => {
      // based on the given role, update the user role
      const user = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role === "USER" ? "ADMIN" : "USER",
        },
      });
      return user;
    })
});
