import { createApolloServer } from './server';

(function main() {
  const { app, apolloServer } = createApolloServer();
  if (app.get('env') !== 'production') {
    const path = require('path');
    const dotenvOutput = require('dotenv').config({ env: path.resolve(__dirname, '../.env') });
    if (dotenvOutput.error) {
      throw dotenvOutput.error;
    }
    console.info('environment variables(configs and secrets):', dotenvOutput.parsed);
  }
  const config = require('./config').default;
  const credentials = require('./credentials').default;
  app.set('config: ', config);
  app.set('credentials: ', credentials);
  console.log('\nconfig: ', config);
  console.log('\ncredentials: ', credentials);
  app.listen(config.PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${config.PORT}${apolloServer.graphqlPath}`),
  );
})();
