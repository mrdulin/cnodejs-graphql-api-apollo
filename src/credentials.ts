const credentials = {
  CNODE_ACCESS_TOKEN: process.env.CNODE_ACCESS_TOKEN,
  JWT_SCERET: process.env.JWT_SCERET || '',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1d',
};

export default credentials;
