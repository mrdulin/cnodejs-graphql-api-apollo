import { IResolvers } from 'graphql-tools';
import { AppContext } from '../../context';

export const resolvers: IResolvers = {
  Query: {
    async topics(_, { params }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.getTopics(params);
    },
    async topic(_, { id }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.getTopicById(id);
    },
    async topicCollected(_, { loginname }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.getCollectedTopics(loginname);
    },
  },
  Topic: {
    async author(parent, _, __) {
      return parent.author;
    },
  },
  TopicDetail: {
    async author(parent, _, __) {
      return parent.author;
    },
  },
  BaseTopic: {
    __resolveType(obj, _, __) {
      if (obj.author_id) {
        return 'Topic';
      }
      if (obj.replies) {
        return 'TopicDetail';
      }
      return null;
    },
  },
};
