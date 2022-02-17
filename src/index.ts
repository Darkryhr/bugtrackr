import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const port = process.env.PORT || 8080;

new ApolloServer({
  resolvers,
  typeDefs,
}).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}`)
);
