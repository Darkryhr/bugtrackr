import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

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
    priority: Priority!
    assignedTo: ID
    dueBy: Date
    createdAt: Date!
    status: Status!
    solvedOn: Date
    description: String!
    reportedBy: ID!
    changelog: [Change!]
  }

  type Change {
    id: Int!
    description: String!
    message: String!
    timestamp: Date!
    releaseVersion: String!
  }

  type Query {
    allBugs: [Bug!]
    bug(id: ID!): Bug!
  }

  type Mutation {
    signUp(data: UserCreateInput!): String
    login(data: UserLoginInput!): String
    reportBug(data: BugReport): ID!
  }

  input UserCreateInput {
    name: String!
    email: String!
    username: String!
    password: String!
    role: Role
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input BugReport {
    reportedBy: ID!
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
