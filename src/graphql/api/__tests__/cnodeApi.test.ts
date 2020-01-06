// tslint:disable: no-string-literal
import { CnodeAPI } from '../cnodeApi';
import config from '../../../config';
import { InMemoryLRUCache } from 'apollo-server-caching';
import {
  mockGetTopicsSuccessResponse,
  mockGetTopicsFailureResponse,
  mockGetTopicByIdSuccessResponse,
  mockGetTopicByIdFailureResponse,
  mockGetUserSuccessResponse,
  mockGetUserFailureResponse,
  mockValidateAccessTokenSuccessResponse,
  mockValidateAccessTokenFailureResponse,
  mockGetMessageCountSuccessResponse,
  mockGetMessageCountFailureResponse,
  mockGetMessagesSuccessResponse,
  mockGetMessagesFailureResponse,
  mockMarkAllMessagesSuccessResponse,
  mockMarkAllMessagesFailureResponse,
  mockMarkOneMessageSuccessResponse,
  mockMarkOneMessageFailureResponse,
} from './fixtures';

describe('cnodeApi', () => {
  let cnodeApi: CnodeAPI;
  const mocks = { get: jest.fn(), post: jest.fn() };
  beforeAll(() => {
    cnodeApi = new CnodeAPI();
    cnodeApi.initialize({ context: { CNODE_API_BASE_URL: config.CNODE_API_BASE_URL }, cache: new InMemoryLRUCache() });
    cnodeApi['get'] = mocks.get;
    cnodeApi['post'] = mocks.post;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#getTopics', () => {
    it('should get topics correctly', async () => {
      mocks.get.mockResolvedValueOnce(mockGetTopicsSuccessResponse);
      const actual = await cnodeApi.getTopics();
      expect(actual).toEqual(mockGetTopicsSuccessResponse.data);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/topics', undefined);
    });

    it('should return empty array if get topics failure', async () => {
      mocks.get.mockResolvedValueOnce(mockGetTopicsFailureResponse);
      const actual = await cnodeApi.getTopics();
      expect(actual).toEqual([]);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/topics', undefined);
    });
  });

  describe('#getTopicById', () => {
    it('should get topic by id correctly', async () => {
      mocks.get.mockResolvedValueOnce(mockGetTopicByIdSuccessResponse);
      const actual = await cnodeApi.getTopicById('1');
      expect(actual).toEqual(mockGetTopicByIdSuccessResponse.data);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/topic/1');
    });

    it('should return empty object if get topic by id failure', async () => {
      mocks.get.mockResolvedValueOnce(mockGetTopicByIdFailureResponse);
      const actual = await cnodeApi.getTopicById('1');
      expect(actual).toEqual({});
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/topic/1');
    });
  });

  describe('#getUser', () => {
    it('should get user by loginname correctly', async () => {
      mocks.get.mockResolvedValueOnce(mockGetUserSuccessResponse);
      const actual = await cnodeApi.getUser(/** loginname = */ 'mrdulin');
      expect(actual).toEqual(mockGetUserSuccessResponse.data);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/user/mrdulin');
    });

    it('should return user model with default values of properties', async () => {
      mocks.get.mockResolvedValueOnce(mockGetUserFailureResponse);
      const actual = await cnodeApi.getUser(/** loginname = */ 'mrdulin');
      expect(actual).toEqual({
        loginname: '',
        avatar_url: '',
        githubUsername: '',
        create_at: '1900-01-01',
        score: 0,
        recent_topics: [],
        recent_replies: [],
      });
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/user/mrdulin');
    });
  });

  describe('#validateAccessToken', () => {
    it('should pass access token validation', async () => {
      mocks.post.mockResolvedValueOnce(mockValidateAccessTokenSuccessResponse);
      const actual = await cnodeApi.validateAccessToken(/** accesstoken = */ '123');
      expect(actual).toEqual({
        loginname: 'mrdulin',
        id: '1',
        avatar_url: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120',
      });
      expect(cnodeApi['post']).toBeCalledWith('https://cnodejs.org/api/v1/accesstoken', { accesstoken: '123' });
    });

    it('should return empty user if not pass validation', async () => {
      mocks.post.mockResolvedValueOnce(mockValidateAccessTokenFailureResponse);
      const actual = await cnodeApi.validateAccessToken(/** accesstoken = */ '123');
      expect(actual).toEqual({
        loginname: '',
        id: '',
        avatar_url: '',
      });
      expect(cnodeApi['post']).toBeCalledWith('https://cnodejs.org/api/v1/accesstoken', { accesstoken: '123' });
    });
  });

  describe('#getMessageCount', () => {
    it('should get message count correctly', async () => {
      mocks.get.mockResolvedValueOnce(mockGetMessageCountSuccessResponse);
      const actual = await cnodeApi.getMessageCount(/** accesstoken = */ '123');
      expect(actual).toBe(3);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/message/count', { accesstoken: '123' });
    });

    it('should return 0 if get message count failure', async () => {
      mocks.get.mockResolvedValueOnce(mockGetMessageCountFailureResponse);
      const actual = await cnodeApi.getMessageCount(/** accesstoken = */ '123');
      expect(actual).toBe(0);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/message/count', { accesstoken: '123' });
    });
  });

  describe('#getMessages', () => {
    it('should get messages correctly', async () => {
      mocks.get.mockResolvedValueOnce(mockGetMessagesSuccessResponse);
      const actual = await cnodeApi.getMessages(/** accesstoken = */ '123');
      expect(actual).toEqual(mockGetMessagesSuccessResponse.data);
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/messages', {
        accesstoken: '123',
        mdrender: true,
      });
    });

    it('should return empty array if get messages failure', async () => {
      mocks.get.mockResolvedValueOnce(mockGetMessagesFailureResponse);
      const actual = await cnodeApi.getMessages(/** accesstoken = */ '123');
      expect(actual).toEqual({ has_read_messages: [], hasnot_read_messages: [] });
      expect(cnodeApi['get']).toBeCalledWith('https://cnodejs.org/api/v1/messages', {
        accesstoken: '123',
        mdrender: true,
      });
    });
  });

  describe('#markAllMessages', () => {
    it('should mark all messages correctly', async () => {
      mocks.post.mockResolvedValueOnce(mockMarkAllMessagesSuccessResponse);
      const actual = await cnodeApi.markAllMessages(/** accesstoken = */ '123');
      expect(actual).toEqual(mockMarkAllMessagesSuccessResponse.marked_msgs);
      expect(cnodeApi['post']).toBeCalledWith('https://cnodejs.org/api/v1/message/mark_all', { accesstoken: '123' });
    });

    it('should return empty array if mark all messages failure', async () => {
      mocks.post.mockResolvedValueOnce(mockMarkAllMessagesFailureResponse);
      const actual = await cnodeApi.markAllMessages(/** accesstoken = */ '123');
      expect(actual).toEqual([]);
      expect(cnodeApi['post']).toBeCalledWith('https://cnodejs.org/api/v1/message/mark_all', { accesstoken: '123' });
    });
  });

  describe('#markOneMessage', () => {
    it('should mark one message correctly', async () => {
      mocks.post.mockResolvedValueOnce(mockMarkOneMessageSuccessResponse);
      const actual = await cnodeApi.markOneMessage(/** accesstoken = */ '123', /** msgId = */ '1');
      expect(actual).toEqual(mockMarkOneMessageSuccessResponse.marked_msg_id);
      expect(cnodeApi['post']).toBeCalledWith('https://cnodejs.org/api/v1/message/mark_one/1', { accesstoken: '123' });
    });

    it('should return empty string if mark one message failure', async () => {
      mocks.post.mockResolvedValueOnce(mockMarkOneMessageFailureResponse);
      const actual = await cnodeApi.markOneMessage(/** accesstoken = */ '123', /** msgId = */ '1');
      expect(actual).toBe('');
      expect(cnodeApi['post']).toBeCalledWith('https://cnodejs.org/api/v1/message/mark_one/1', { accesstoken: '123' });
    });
  });
});
