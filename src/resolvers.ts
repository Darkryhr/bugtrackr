import { GraphQLScalarType, Kind } from 'graphql';
import { prisma } from './db';
import { BugReport, UserCreateInput, UserLoginInput } from './models';
import bcrypt from 'bcryptjs';

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
    allBugs: (_: any, _args: any, context: any) => {
      console.log(context);
      return prisma.bug.findMany();
    },
    bug: (_: any, args: { id: string }) => {
      return prisma.bug.findFirst({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    signUp: async (_: any, args: UserCreateInput) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const res = await prisma.user.create({
        data: {
          name: args.name,
          username: args.username,
          email: args.email,
          password: hashedPassword,
        },
        select: {
          id: true,
        },
      });

      return res.id;
    },
    login: async (_: any, args: UserLoginInput) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
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
