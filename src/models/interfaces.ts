export interface BugReport {
  reportedBy: string;
  description: string;
  priority?: Priority;
}

export interface UserCreateInput {
  name: string;
  email: string;
  username: string;
  password: string;
  role?: Role;
}

export interface UserLoginInput {
  email: string;
  password: string;
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
