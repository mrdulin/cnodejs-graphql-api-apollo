import { constructTestServer } from '../../../__utils';
import { createTestClient } from 'apollo-server-testing';
import * as Q from './fixtures/queries';
import * as M from './fixtures/mutations';
import {
  mockGetTopicsSuccessResponse,
  mockGetTopicByIdSuccessResponse,
  mockGetCollectedTopicsSuccessResponse,
  mockGetCollectedTopicsFailureResponse,
  mockCollectTopicSuccessResponse,
  mockDeCollectTopicSuccessResponse,
} from '../../../../graphql/api/__tests__/fixtures';

describe('topic integration test suites', () => {
  describe('Query#topics', () => {
    it('should get topics correctly', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.getTopics = jest.fn().mockResolvedValueOnce(mockGetTopicsSuccessResponse.data);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_TOPICS });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getTopics).toBeCalledWith(undefined);
    });

    it('should return error if get topics failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const mError = new Error('some error');
      cnodeAPI.getTopics = jest.fn().mockRejectedValueOnce(mError);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_TOPICS });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getTopics).toBeCalledWith(undefined);
    });
  });

  describe('Query#topic', () => {
    it('should get topic by id correctly', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.getTopicById = jest.fn().mockResolvedValueOnce(mockGetTopicByIdSuccessResponse.data);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_TOPIC_BY_ID, variables: { id: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getTopicById).toBeCalledWith('1');
    });

    it('should return error if get topic by id failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const mError = new Error('some error');
      cnodeAPI.getTopicById = jest.fn().mockRejectedValueOnce(mError);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_TOPIC_BY_ID, variables: { id: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getTopicById).toBeCalledWith('1');
    });
  });

  describe('Query#topicCollected', () => {
    it('should get collected topics', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.getCollectedTopics = jest.fn().mockResolvedValueOnce(mockGetCollectedTopicsSuccessResponse.data);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_COLLECTED_TOPICS, variables: { loginname: 'mrdulin' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getCollectedTopics).toBeCalledWith('mrdulin');
    });

    it('should return empty array if get collected topics faliure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.getCollectedTopics = jest.fn().mockResolvedValueOnce(mockGetCollectedTopicsFailureResponse.data);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_COLLECTED_TOPICS, variables: { loginname: 'mrdulin' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getCollectedTopics).toBeCalledWith('mrdulin');
    });
  });

  describe('Mutation#collectTopic', () => {
    it('should collect topic', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.collectTopic = jest.fn().mockResolvedValueOnce(mockCollectTopicSuccessResponse);
      const { mutate } = createTestClient(server as any);
      const res = await mutate({ mutation: M.COLLECT_TOPIC, variables: { accesstoken: '123', topicId: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.collectTopic).toBeCalledWith('123', '1');
    });
  });

  describe('Mutation#deCollectTopic', () => {
    it('should cancel collect topic', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.deCollectTopic = jest.fn().mockResolvedValueOnce(mockDeCollectTopicSuccessResponse);
      const { mutate } = createTestClient(server as any);
      const res = await mutate({ mutation: M.DE_COLLECT_TOPIC, variables: { accesstoken: '123', topicId: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.deCollectTopic).toBeCalledWith('123', '1');
    });
  });
});
