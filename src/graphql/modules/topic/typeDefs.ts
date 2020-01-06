import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    topics(params: GetTopicsParameters): [Topic]!
    topic(id: ID!): TopicDetail
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

  interface BaseTopic {
    id: ID!
    title: String!
    last_reply_at: String!
  }

  type BaseTopicWithAuthor implements BaseTopic {
    id: ID!
    title: String!
    last_reply_at: String!
    author: BaseUser!
  }

  type Topic implements BaseTopic {
    id: ID!
    title: String!
    last_reply_at: String!
    author_id: ID!
    tab: Tab!
    content: String!
    good: Boolean
    top: Boolean
    reply_count: Int
    visit_count: Int
    create_at: String
    author: BaseUser!
  }

  type TopicDetail implements BaseTopic {
    id: ID!
    author_id: ID!
    last_reply_at: String!
    tab: Tab!
    content: String!
    title: String!
    good: Boolean
    top: Boolean
    reply_count: Int
    visit_count: Int
    create_at: String
    author: BaseUser!
    replies: [Reply]!
    is_collect: Boolean
  }
`;
