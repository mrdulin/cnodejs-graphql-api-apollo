import { gql } from 'apollo-server';
import * as F from '../../../fragments';

export const GET_TOPICS = gql`
  query topics($params: GetTopicsParameters) {
    topics(params: $params) {
      ...TopicFragment
      author {
        ...AuthorBasicInfo
      }
    }
  }
  ${F.AUTHOR_BASIC_INFO}
  ${F.TOPIC}
`;

export const GET_TOPIC_BY_ID = gql`
  query topic($id: ID!) {
    topic(id: $id) {
      ...TopicDetailFragment
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
  ${F.TOPIC_DETAIL}
`;

export const GET_COLLECTED_TOPICS = gql`
  query topicCollected($loginname: String!) {
    topicCollected(loginname: $loginname) {
      ...TopicFragment
      author {
        ...AuthorBasicInfo
      }
    }
  }
  ${F.AUTHOR_BASIC_INFO}
  ${F.TOPIC}
`;
