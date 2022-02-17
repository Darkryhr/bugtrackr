export interface BugReport {
  reportedBy: string;
  description: string;
  priority?: Priority;
}

export interface UserCreateInput {
  name: string;
  username: string;
  role: Role;
}

enum Priority {
  LOW = 'LOW',
  STANDARD = 'STANDARD',
  HIGH = 'HIGH',
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
