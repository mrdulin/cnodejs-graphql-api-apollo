const config = {
  PORT: process.env.PORT || 3200,
  CNODE_API_BASE_URL: 'https://cnodejs.org/api/v1',
  GRAPHQL_ENDPOINT: '/graphql',
  GRAPHIQL_ENDPOINT: '/graphiql',
  WS_PATH: '/subscriptions',
};

export default config;
