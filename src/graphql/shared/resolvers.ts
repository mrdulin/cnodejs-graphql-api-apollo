import { IResolvers } from 'graphql-tools';

export const resolvers: IResolvers = {
  Node: {
    __resolveType(obj, _, __) {
      return obj.__typename;
    },
  },
};
