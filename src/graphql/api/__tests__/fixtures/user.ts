export const mockGetUserSuccessResponse = {
  success: true,
  data: {
    loginname: 'alsotang',
    avatar_url: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120',
    githubUsername: 'alsotang',
    create_at: '2012-09-09T05:26:58.319Z',
    score: 15700,
    recent_topics: [
      {
        id: '5c6d11d033b0b629ac8434ef',
        author: {
          loginname: 'alsotang',
          avatar_url: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120',
        },
        title: '【深圳】腾讯云加速产品中心--前端工程师',
        last_reply_at: '2019-05-11T04:22:18.616Z',
      },
    ],
  },
};

export const mockGetUserFailureResponse = {
  success: false,
};

export const mockValidateAccessTokenSuccessResponse = {
  success: true,
  loginname: 'mrdulin',
  id: '1',
  avatar_url: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120',
};

export const mockValidateAccessTokenFailureResponse = {
  success: false,
};
