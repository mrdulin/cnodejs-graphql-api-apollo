import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { contextFunction, dataSources, schema } from './graphql';
import morgan from 'morgan';
import { formatError } from './utils';
import { IAnyObject } from './shared/interface';

interface IApolloServerOptions {
  config: IAnyObject;
  credentials: IAnyObject;
}

export function createApolloServer({ credentials, config }: IApolloServerOptions) {
  const app = express();
  app.use(morgan('dev', { skip: () => config.NODE_ENV === 'production' }));

  const apolloServer = new ApolloServer({
    schema,
    context: contextFunction,
    dataSources,
    formatError,
    introspection: config.NODE_ENV !== 'production',
    // engine: {
    //   apiKey: credentials.ENGINE_API_KEY,
    // },
  });
  apolloServer.applyMiddleware({ app, cors: true, bodyParserConfig: true });

  return { app, apolloServer };
}
