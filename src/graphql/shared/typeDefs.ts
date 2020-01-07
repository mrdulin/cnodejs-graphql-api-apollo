import { gql } from 'apollo-server';

export const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type Response {
    success: Boolean!
  }
`;
