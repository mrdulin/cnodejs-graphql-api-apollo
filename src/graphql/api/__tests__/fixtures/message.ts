export const mockGetMessageCountSuccessResponse = {
  success: true,
  data: 3,
};

export const mockGetMessageCountFailureResponse = {
  success: false,
};

export const mockGetMessagesSuccessResponse = {
  success: true,
  data: {
    has_read_messages: [],
    hasnot_read_messages: [
      {
        id: '543fb7abae523bbc80412b26',
        type: 'at',
        has_read: false,
        author: {
          loginname: 'alsotang',
          avatar_url: 'https://avatars.githubusercontent.com/u/1147375?v=2',
        },
        topic: {
          id: '542d6ecb9ecb3db94b2b3d0f',
          title: 'adfadfadfasdf',
          last_reply_at: '2014-10-18T07:47:22.563Z',
        },
        reply: {
          id: '543fb7abae523bbc80412b24',
          content: '[@alsotang](/user/alsotang) 哈哈',
          ups: [],
          create_at: '2014-10-16T12:18:51.566Z',
        },
      },
    ],
  },
};

export const mockGetMessagesFailureResponse = {
  success: false,
};

export const mockMarkAllMessagesSuccessResponse = {
  success: true,
  marked_msgs: [{ id: '544ce385aeaeb5931556c6f9' }],
};

export const mockMarkAllMessagesFailureResponse = {
  success: false,
};

export const mockMarkOneMessageSuccessResponse = {
  success: true,
  marked_msg_id: '58ec7d39da8344a81eee0c14',
};
export const mockMarkOneMessageFailureResponse = {
  success: false,
};
