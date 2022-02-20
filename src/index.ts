import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { getUser } from './utils';

const port = process.env.PORT || 8080;

new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => {
    const tokenHeader = req.headers.authorization || '';
    const user = getUser(tokenHeader);
    return { user };
  },
}).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}`)
);
