import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    messageCount(accesstoken: String!): Int!
    messages(accesstoken: String!, mdrender: Boolean): MessagesResponse!
  }

  extend type Mutation {
    markAllMessages(accesstoken: String!): [Node]!
    markOneMessage(accesstoken: String!, msgId: ID!): ID!
  }

  type MessagesResponse {
    has_read_messages: [Message]!
    hasnot_read_messages: [Message]!
  }

  type Message implements Node {
    id: ID!
    type: String
    has_read: Boolean
    author: BaseUser
    topic: BaseTopic
    reply: MessageReply
  }
`;
