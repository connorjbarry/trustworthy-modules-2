import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const packageRouter = createTRPCRouter({
  createPackage: publicProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string().optional(),
        author: z.string().optional(),
        version: z.string().optional(),
        fileUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const individualPkg = await ctx.prisma.indivPkg.create({
        data: {
          name: input.name,
          githubLink: input.link,
          author: input.author,
          version: input.version,
          fileURL: input.fileUrl,
        },
      });
      return individualPkg;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const pkgs = await ctx.prisma.indivPkg.findMany();
    if (!pkgs) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No packages in the registry",
      });
    }
    return pkgs;
  }),
  getSearched: publicProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const pkgs = await ctx.prisma.indivPkg.findMany({
        where: {
          OR: [
            { name: { contains: input.search } },
            { author: { contains: input.search } },
          ],
        },
      });
      if (!pkgs) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No packages match the search input",
        });
      }
      return pkgs;
    }),
});
