import config from '../config';
import { dataSources } from './';

export function contextFunction({ req }) {
  return {
    CNODE_API_BASE_URL: config.CNODE_API_BASE_URL,
  };
}

export type AppContext = ReturnType<typeof contextFunction> & { dataSources: ReturnType<typeof dataSources> };
