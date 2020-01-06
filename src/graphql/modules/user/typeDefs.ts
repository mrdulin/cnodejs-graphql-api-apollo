import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    user(loginname: String!): User
    accesstoken(accesstoken: String!): ValidateAccessTokenResponse
  }

  type ValidateAccessTokenResponse implements Node {
    id: ID!
    success: Boolean!
    loginname: String
    avatar_url: String
  }

  type BaseUser {
    loginname: String!
    avatar_url: String
  }

  type User {
    loginname: String!
    avatar_url: String
    githubUsername: String
    create_at: String
    score: Int
    recent_topics: [BaseTopicWithAuthor]!
    recent_replies: [BaseReply]!
  }
`;
