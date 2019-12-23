import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    loginname: String!
    avatar_url: String
  }
`;
