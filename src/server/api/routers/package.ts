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
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const pkg = await ctx.prisma.indivPkg.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!pkg) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "There is no package with the given id",
        });
      }
      return pkg;
    }),
  deleteOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const pkg = await ctx.prisma.indivPkg.delete({
        where: {
          id: input.id,
        },
      });
      if (!pkg) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "There is no package with the given id",
        });
      }
      return pkg;
    }),
  getActions: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    ).query(async ({ ctx, input }) => {
      const actions = await ctx.prisma.action.findMany({
        where: {
          indivPkgId: input.id,
        },
      });
      if (!actions) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "There is no package with the given id",
        });
      }
      return actions;
    }),
});
