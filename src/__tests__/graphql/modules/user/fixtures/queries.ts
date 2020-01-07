import { gql } from 'apollo-server';
import * as F from '../../../fragments';

export const GET_USER_BY_LOGINNAME = gql`
  query user($loginname: String!) {
    user(loginname: $loginname) {
      loginname
      avatar_url
      githubUsername
      create_at
      score
      recent_topics {
        id
        title
        last_reply_at
        author {
          ...AuthorBasicInfo
        }
      }
      recent_replies {
        id
        author {
          ...AuthorBasicInfo
        }
        title
        last_reply_at
      }
    }
  }
  ${F.AUTHOR_BASIC_INFO}
`;

export const GET_USER_BY_LOGINNAME_PARTIAL = gql`
  query user($loginname: String!) {
    user(loginname: $loginname) {
      loginname
      avatar_url
      githubUsername
      create_at
      score
    }
  }
`;

export const VALIDATE_ACCESS_TOKEN = gql`
  query accesstoken($accesstoken: String!) {
    accesstoken(accesstoken: $accesstoken) {
      id
      loginname
      avatar_url
    }
  }
`;
