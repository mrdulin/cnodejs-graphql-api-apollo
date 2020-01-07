import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../../__utils';
import {
  mockGetMessageCountSuccessResponse,
  mockGetMessagesSuccessResponse,
  mockMarkAllMessagesSuccessResponse,
  mockMarkOneMessageSuccessResponse,
} from '../../../../graphql/api/__tests__/fixtures';
import * as Q from './fixtures/queries';
import * as M from './fixtures/mutations';

describe('message integration test suites', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('Query#mesasgeCount', () => {
    it('should get message count', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      cnodeAPI.getMessageCount = jest.fn().mockResolvedValueOnce(mockGetMessageCountSuccessResponse.data);
      const res = await query({ query: Q.GET_MESSAGE_COUNT, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getMessageCount).toBeCalledWith('123');
    });

    it('should return error if get message count failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      const mError = new Error('some error');
      cnodeAPI.getMessageCount = jest.fn().mockRejectedValueOnce(mError);
      const res = await query({ query: Q.GET_MESSAGE_COUNT, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getMessageCount).toBeCalledWith('123');
    });
  });

  describe('Query#messages', () => {
    it('should get messages', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      cnodeAPI.getMessages = jest.fn().mockResolvedValueOnce(mockGetMessagesSuccessResponse.data);
      const res = await query({ query: Q.GET_MESSAGES, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getMessages).toBeCalledWith('123', undefined);
    });

    it('should return error if get messages failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      const mError = new Error('some error');
      cnodeAPI.getMessages = jest.fn().mockRejectedValueOnce(mError);
      const res = await query({ query: Q.GET_MESSAGES, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getMessages).toBeCalledWith('123', undefined);
    });

    it('should return accesstoken invalid error if accesstoken is empty string', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      cnodeAPI['get'] = jest.fn();
      const res = await query({ query: Q.GET_MESSAGES, variables: { accesstoken: '' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI['get']).not.toBeCalled();
    });
  });

  describe('Mutation#markAllMessages', () => {
    it('should mark all message', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { mutate } = createTestClient(server as any);
      cnodeAPI.markAllMessages = jest.fn().mockResolvedValueOnce(mockMarkAllMessagesSuccessResponse.marked_msgs);
      const res = await mutate({ mutation: M.MARK_ALL_MESSAGES, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.markAllMessages).toBeCalledWith('123');
    });
    it('should return error if mark all message failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { mutate } = createTestClient(server as any);
      const mError = new Error('some error');
      cnodeAPI.markAllMessages = jest.fn().mockRejectedValueOnce(mError);
      const res = await mutate({ mutation: M.MARK_ALL_MESSAGES, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.markAllMessages).toBeCalledWith('123');
    });
  });

  describe('Mutation#markOneMessage', () => {
    it('should mark one message', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { mutate } = createTestClient(server as any);
      cnodeAPI.markOneMessage = jest.fn().mockResolvedValueOnce(mockMarkOneMessageSuccessResponse.marked_msg_id);
      const res = await mutate({ mutation: M.MARK_ONE_MESSAGE, variables: { accesstoken: '123', msgId: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.markOneMessage).toBeCalledWith('123', '1');
    });

    it('should return error if mark one message failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { mutate } = createTestClient(server as any);
      const mError = new Error('some error');
      cnodeAPI.markOneMessage = jest.fn().mockRejectedValueOnce(mError);
      const res = await mutate({ mutation: M.MARK_ONE_MESSAGE, variables: { accesstoken: '123', msgId: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.markOneMessage).toBeCalledWith('123', '1');
    });
  });
});
