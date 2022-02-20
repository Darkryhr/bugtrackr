import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import { Request } from 'express';
import expressJwt from 'express-jwt';
import http from 'http';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const port = process.env.PORT || 8080;

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    expressJwt({
      secret: 'TEMP_SECRET',
      algorithms: ['HS256'],
      credentialsRequired: false,
    })
  );

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }: { req: Request }) => {
      const user = req.user || null;
      return { user };
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );

  return { server, app };
}

startApolloServer(typeDefs, resolvers);
