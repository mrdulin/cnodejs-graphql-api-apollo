const config = {
  PORT: process.env.PORT || 3200,
  CNODE_API_BASE_URL: 'https://cnodejs.org/api/v1',
  GRAPHQL_ENDPOINT: '/graphql',
  GRAPHIQL_ENDPOINT: '/graphiql',
  WS_PATH: '/subscriptions',
  ENV: process.env.NODE_ENV || 'development',
  cnodejs: {
    accessToken: '426634ce-c482-43d7-a1d6-5271b180a510',
  },
  JWT_SCERET: 'what-the-fuck??',
  JWT_EXPIRES: '1d',
};

export default config;
