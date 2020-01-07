import { gql } from 'apollo-server';

export const AUTHOR_BASIC_INFO = gql`
  fragment AuthorBasicInfo on BaseUser {
    loginname
    avatar_url
  }
`;
