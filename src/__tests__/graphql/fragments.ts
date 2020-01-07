import { gql } from 'apollo-server';

export const AUTHOR_BASIC_INFO = gql`
  fragment AuthorBasicInfo on BaseUser {
    loginname
    avatar_url
  }
`;

export const MESSAGE = gql`
  fragment MessageFragment on Message {
    id
    type
    has_read
    author {
      ...AuthorBasicInfo
    }
    topic {
      id
      title
      last_reply_at
    }
    reply {
      id
      content
      ups
      create_at
    }
  }
  ${AUTHOR_BASIC_INFO}
`;
