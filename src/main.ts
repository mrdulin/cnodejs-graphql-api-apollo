import { createApolloServer } from './server';

(function main() {
  if (process.env.NODE_ENV !== 'production') {
    const path = require('path');
    const dotenvOutput = require('dotenv').config({ env: path.resolve(__dirname, '../.env') });
    if (dotenvOutput.error) {
      throw dotenvOutput.error;
    }
  }
  const config = require('./config').default;
  const credentials = require('./credentials').default;
  const { app, apolloServer } = createApolloServer({ config, credentials });
  app.set('config: ', config);
  app.set('credentials: ', credentials);
  console.log('\nconfig: ', config);
  console.log('\ncredentials: ', credentials);
  app.listen(config.PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${config.PORT}${apolloServer.graphqlPath}`),
  );
})();
