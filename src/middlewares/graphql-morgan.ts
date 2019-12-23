import morgan from 'morgan';

morgan.token('graphql-query', (req) => {
  const { query, variables, operationName } = req.body;
  return `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(variables)}`;
});

export { morgan as graphqlMorgan };
