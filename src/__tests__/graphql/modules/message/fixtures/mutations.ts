import { gql } from 'apollo-server';

export const MARK_ALL_MESSAGES = gql`
  mutation markAllMessage($accesstoken: String!) {
    markAllMessages(accesstoken: $accesstoken) {
      id
    }
  }
`;

export const MARK_ONE_MESSAGE = gql`
  mutation markOneMessage($accesstoken: String!, $msgId: ID!) {
    markOneMessage(accesstoken: $accesstoken, msgId: $msgId)
  }
`;
