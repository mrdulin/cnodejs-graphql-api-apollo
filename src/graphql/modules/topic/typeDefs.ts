import { gql } from 'apollo-server';

const sharedFieldsForTopic = `
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
`;

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

  type BaseTopic implements Node {
    id: ID!
    title: String!
    last_reply_at: String!
  }

  type BaseTopicWithAuthor implements Node {
    id: ID!
    title: String!
    last_reply_at: String!
    author: BaseUser!
  }

  type Topic implements Node {
    ${sharedFieldsForTopic}
    author: BaseUser!
  }

  type TopicDetail implements Node {
    ${sharedFieldsForTopic}
    author: BaseUser!
    replies: [Reply]!
    is_collect: Boolean
  }
`;
