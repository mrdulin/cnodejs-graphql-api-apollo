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
  Mutation: {
    async collectTopic(_, { accesstoken, topicId }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.collectTopic(accesstoken, topicId);
    },
    async deCollectTopic(_, { accesstoken, topicId }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.deCollectTopic(accesstoken, topicId);
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
};
