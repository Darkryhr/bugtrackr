import { GraphQLScalarType, Kind } from 'graphql';
import { prisma } from './db';
import { BugReport, UserCreateInput } from './models';

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    serialize(value: any): number {
      return value.getTime();
    },
    parseValue(value: any): Date {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),

  Query: {
    allBugs: () => {
      return prisma.bug.findMany();
    },
    bug: (_: any, args: { id: string }) => {
      return prisma.bug.findFirst({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    createUser: async (_: any, args: UserCreateInput) => {
      const res = await prisma.user.create({
        data: {
          name: args.name,
          username: args.username,
        },
        select: {
          id: true,
        },
      });
      return res.id;
    },
    reportBug: async (_: any, args: { data: BugReport }) => {
      const res = await prisma.bug.create({
        data: {
          description: args.data.description,
          reportedBy: args.data.reportedBy,
        },
        select: {
          id: true,
        },
      });

      return res.id;
    },
  },
};
