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
  },
  Topic: {
    async author(parent, _, __) {
      return parent.author;
    },
  },
};