import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    role: Role!
    bugsAssigned: [Bug!]
    bugsResolved: [Bug!]
  }

  type Bug {
    id: ID!
    Priority: Priority!
    assignedTo: ID!
    dueBy: DATETIME!
    createdAt: DATETIME!
    status: Status!
    solvedOn: DATETIME!
    description: String
    reportedBy: ID!
    changelog: [change!]
  }

  type Change {
    description: String!
    message: String!
    timestamp: DATETIME!
    releaseVersion: String!
  }

  type Query {
    allBugs: String
  }

  type Mutation {
    createUser(data: UserCreateInput): ID!
    updateBug(id: ID!): ID!
    reportBug(data: BugReport): ID!
  }

  input UserCreateInput {
    name: String!
  }

  input BugReport {
    reportedBy: ID!
    priority: Priority
    description: String!
  }

  enum Role {
    ADMIN
    DEV
  }

  enum Priority {
    LOW
    STANDARD
    HIGH
  }

  enum Status {
    PENDING
    ACTIVE
    CLOSED
  }
`;
