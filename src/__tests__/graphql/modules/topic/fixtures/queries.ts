import { gql } from 'apollo-server';

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
        loginname
        avatar_url
      }
    }
  }
`;
