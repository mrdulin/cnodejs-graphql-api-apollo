import { makeExecutableSchema, gql } from 'apollo-server';
import { merge } from 'lodash';

import * as topic from './modules/topic';
import * as user from './modules/user';
import * as message from './modules/message';
import * as reply from './modules/reply';
import * as shared from './shared';

const typeDefs = gql`
  type Query {
    _root: String
  }
  type Mutation {
    _root: String
  }
`;

const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, shared.typeDefs, topic.typeDefs, user.typeDefs, message.typeDefs, reply.typeDefs],
  resolvers: merge(resolvers, shared.resolvers, topic.resolvers, user.resolvers, message.resolvers),
});

export { schema };
