import { CnodeAPI } from './api';

export const dataSources = () => {
  return {
    cnodeAPI: new CnodeAPI(),
  };
};
