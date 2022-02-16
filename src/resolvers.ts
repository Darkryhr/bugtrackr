import { prisma } from './db';

interface BugReport {
  reportedBy: string;
  priority: Priority;
  description: string;
}

interface UserCreateInput {
  name: string;
}

enum Priority {
  LOW,
  STANDARD,
  HIGH,
}

enum Role {
  ADMIN,
  DEV,
}

enum Status {
  PENDING,
  ACTIVE,
  CLOSED,
}

export const resolvers = {
  Query: {
    allBugs: () => {},
    bug: (_: any, args: { id: string }) => {},
  },
  Mutation: {
    createUser: (_: any, args: UserCreateInput) => {},
    updateBug: (_: any, args: { id: string }) => {},
    reportBug: (_: any, data: BugReport) => {},
  },
};
