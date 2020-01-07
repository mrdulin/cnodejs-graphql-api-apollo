import { gql } from 'apollo-server';

export const COLLECT_TOPIC = gql`
  mutation collectTopic($accesstoken: String!, $topicId: ID!) {
    collectTopic(accesstoken: $accesstoken, topicId: $topicId) {
      success
    }
  }
`;

export const DE_COLLECT_TOPIC = gql`
  mutation deCollectTopic($accesstoken: String!, $topicId: ID!) {
    deCollectTopic(accesstoken: $accesstoken, topicId: $topicId) {
      success
    }
  }
`;
