import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    topics(params: GetTopicsParameters): [Topic]!
    topic(id: ID!): Topic
  }

  input GetTopicsParameters {
    page: Int
    tab: Tab
    limit: Int
    mdrender: String
  }

  type Reply {
    id: ID!
    author: User!
    content: String
    ups: [String]!
    create_at: String
    reply_id: ID!
    is_uped: Boolean
  }

  type BaseReply {
    id: ID!
    author: BaseUser!
    title: String!
    last_reply_at: String!
  }

  enum Tab {
    ask
    share
    job
    good
  }

  type BaseTopic {
    id: ID!
    author: BaseUser!
    title: String!
    last_reply_at: String!
  }

  type Topic {
    id: ID!
    author_id: ID!
    tab: Tab!
    content: String!
    title: String!
    last_reply_at: String!
    good: Boolean
    top: Boolean
    reply_count: Int
    visit_count: Int
    create_at: String
    author: User!
    replies: [Reply]!
  }
`;
