import { gql } from 'apollo-server';
import * as F from '../../../fragments';

export const GET_MESSAGE_COUNT = gql`
  query messageCount($accesstoken: String!) {
    messageCount(accesstoken: $accesstoken)
  }
`;

export const GET_MESSAGES = gql`
  query messages($accesstoken: String!, $mdrender: Boolean) {
    messages(accesstoken: $accesstoken, mdrender: $mdrender) {
      has_read_messages {
        ...MessageFragment
      }
      hasnot_read_messages {
        ...MessageFragment
      }
    }
  }
  ${F.MESSAGE}
`;
