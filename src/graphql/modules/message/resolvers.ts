import { IResolvers } from 'graphql-tools';
import { AppContext } from '../../context';

export const resolvers: IResolvers = {
  Query: {
    async messageCount(_, { accesstoken }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.getMessageCount(accesstoken);
    },
    async messages(_, { accesstoken, mdrender }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.getMessages(accesstoken, mdrender);
    },
  },
  Mutation: {
    async markAllMessages(_, { accesstoken }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.markAllMessages(accesstoken);
    },

    async markOneMessage(_, { accesstoken, msgId }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.markOneMessage(accesstoken, msgId);
    },
  },
};
