import { createApolloServer } from './server';

(function main() {
  const { app, apolloServer } = createApolloServer();
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
})();
