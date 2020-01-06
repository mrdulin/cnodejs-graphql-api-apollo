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

  enum Tab {
    ask
    share
    job
    good
  }

  type BaseTopic implements Node {
    id: ID!
    title: String!
    last_reply_at: String!
  }

  type BaseTopicWithAuthor implements Node {
    id: ID!
    author: BaseUser!
    title: String!
    last_reply_at: String!
  }

  type Topic implements Node {
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
