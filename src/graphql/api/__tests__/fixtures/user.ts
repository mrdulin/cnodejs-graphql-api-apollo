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
    recent_replies: [
      {
        id: '5dfc8d180696c446bf64f5d5',
        author: {
          loginname: 'zhangcheng-RunRun',
          avatar_url: 'https://avatars3.githubusercontent.com/u/59083067?v=4&s=120',
        },
        title: '【1封新邀请】5大主题干货满满 ECUG For Future技术盛宴等你参加！',
        last_reply_at: '2019-12-25T14:24:01.372Z',
      },
      {
        id: '5df243e2df1b9a40d14c6504',
        author: {
          loginname: 'kenghuang',
          avatar_url: 'https://avatars3.githubusercontent.com/u/24793336?v=4&s=120',
        },
        title: '社区推荐的安卓版客户端为啥不能回复',
        last_reply_at: '2019-12-15T03:38:59.776Z',
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
