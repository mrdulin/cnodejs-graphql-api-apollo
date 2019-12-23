import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { contextFunction, dataSources, schema } from './graphql';
import morgan from 'morgan';
import { formatError } from './utils';

export function createApolloServer() {
  const app = express();
  app.use(morgan('dev'));

  const apolloServer = new ApolloServer({
    schema,
    context: contextFunction,
    dataSources,
    formatError,
  });
  apolloServer.applyMiddleware({ app, cors: true, bodyParserConfig: true });

  return { app, apolloServer };
}
