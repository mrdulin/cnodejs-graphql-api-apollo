import { makeExecutableSchema, gql } from 'apollo-server';
import { merge } from 'lodash';

import * as topic from './modules/topic';
import * as user from './modules/user';

const typeDefs = gql`
  type Query {
    _root: String
  }
`;

const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, topic.typeDefs, user.typeDefs],
  resolvers: merge(resolvers, topic.resolvers),
});

export { schema };
