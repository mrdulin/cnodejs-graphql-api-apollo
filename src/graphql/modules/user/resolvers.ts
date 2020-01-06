import { IResolvers } from 'graphql-tools';
import { AppContext } from '../../context';

export const resolvers: IResolvers = {
  Query: {
    async user(_, { loginname }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.getUser(loginname);
    },
    async accesstoken(_, { accesstoken }, { dataSources }: AppContext) {
      return dataSources.cnodeAPI.validateAccessToken(accesstoken);
    },
  },
  BaseUserInfo: {
    __resolveType(user) {
      if (user.githubUsername) {
        return 'User';
      }
      return 'BaseUser';
    },
  },
};
