import { GraphQLScalarType, Kind } from 'graphql';
import { prisma } from './db';
import { Prisma } from '@prisma/client';
import { BugReport, UserCreateInput, UserLoginInput } from './models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

interface ErrorMeta {
  target: string[];
}
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
      return prisma.bug.findMany();
    },
    bug: (_: any, args: { id: string }) => {
      return prisma.bug.findFirst({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    signUp: async (
      _: any,
      args: {
        data: UserCreateInput;
      }
    ) => {
      const { data } = args;
      try {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({
          data: {
            name: data.name,
            username: data.username,
            email: data.email,
            password: hashedPassword,
          },
        });

        return jwt.sign({ id: user.id, role: user.role }, 'TEMP_SECRET', {
          algorithm: 'HS256',
          expiresIn: '1d',
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            console.log(error);
            //TODO: get target violater from meta(typed as object, cant access fields)
            throw new UserInputError(`There is a unique constraint violation`);
          }
        }
      }
    },
    login: async (_: any, args: { data: UserLoginInput }) => {
      const { data } = args;
      try {
        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });
        if (!user) throw new UserInputError('No user found');
        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new UserInputError('Invalid password');

        return jwt.sign({ id: user.id, role: user.role }, 'TEMP_SECRET', {
          algorithm: 'HS256',
          expiresIn: '1d',
        });
      } catch (error) {
        console.log(error);
      }
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
