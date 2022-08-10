import { allow, rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'ADMIN';
  }
);

export default shield(
  {
    Query: {
      allBugs: allow,
      bug: isAuthenticated,
    },
    Mutation: {
      signUp: allow,
      login: allow,
      reportBug: isAuthenticated,
    },
  },
  {
    debug: true,
  }
);
