import { ApolloServer } from 'apollo-server';
import { contextFunction as defaultContext } from '../graphql/context';
import { schema } from '../graphql/schema';
import { CnodeAPI } from '../graphql/api';

const constructTestServer = ({ context = defaultContext } = {}) => {
  const cnodeAPI = new CnodeAPI();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({ cnodeAPI }),
    context,
  });

  return { server, cnodeAPI };
};

export { constructTestServer };
