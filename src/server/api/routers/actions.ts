import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const actionRouter = createTRPCRouter({
  onUpload: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const username = ctx.session?.user?.name || "";
      const action = await ctx.prisma.action.create({
        data: {
          username: username,
          action: "CREATE",
          indivPkgId: input.id,
        },
      });
      return action;
    }),
});
