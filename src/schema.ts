import { gql } from 'apollo-server';

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
    createUser(data: UserCreateInput): ID!
    reportBug(data: BugReport): ID!
  }

  input UserCreateInput {
    name: String!
    username: String!
    role: Role!
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
