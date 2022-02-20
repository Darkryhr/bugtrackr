import { rule, shield } from 'graphql-shield';

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

export default shield({
  Query: {
    allBugs: isAuthenticated,
    bug: isAuthenticated,
  },
  Mutation: {
    reportBug: isAuthenticated,
  },
});
