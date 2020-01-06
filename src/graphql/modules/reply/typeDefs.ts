import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Reply implements Node {
    id: ID!
    author: BaseUser!
    content: String
    ups: [String]!
    create_at: String
    reply_id: ID
    is_uped: Boolean
  }

  type MessageReply implements Node {
    id: ID!
    content: String
    ups: [String]!
    create_at: String
  }

  type BaseReply implements Node {
    id: ID!
    author: BaseUser!
    title: String!
    last_reply_at: String!
  }
`;
