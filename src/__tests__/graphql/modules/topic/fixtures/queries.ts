import { gql } from 'apollo-server';
import * as F from './fragments';

export const GET_TOPICS = gql`
  query topics($params: GetTopicsParameters) {
    topics(params: $params) {
      id
      author_id
      tab
      content
      title
      last_reply_at
      good
      top
      reply_count
      visit_count
      create_at
      author {
        ...AuthorBasicInfo
      }
    }
  }
  ${F.AUTHOR_BASIC_INFO}
`;

export const GET_TOPIC_BY_ID = gql`
  query topic($id: ID!) {
    topic(id: $id) {
      id
      author_id
      tab
      content
      title
      last_reply_at
      good
      top
      reply_count
      visit_count
      create_at
      author {
        ...AuthorBasicInfo
      }
      replies {
        id
        author {
          ...AuthorBasicInfo
        }
        content
        ups
        create_at
        reply_id
        is_uped
      }
      is_collect
    }
  }
  ${F.AUTHOR_BASIC_INFO}
`;
