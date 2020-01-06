import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    user(loginname: String!): User
    accesstoken(accesstoken: String!): ValidateAccessTokenResponse
  }

  type ValidateAccessTokenResponse {
    success: Boolean!
    loginname: String
    id: ID!
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
    recent_topics: [BaseTopic]!
    recent_replies: [BaseReply]!
  }
`;
