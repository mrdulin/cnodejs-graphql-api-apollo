import { constructTestServer } from '../../../__utils';
import { createTestClient } from 'apollo-server-testing';
import * as Q from './fixtures/queries';
import {
  mockGetTopicsSuccessResponse,
  mockGetTopicByIdSuccessResponse,
} from '../../../../graphql/api/__tests__/fixtures';

describe('topic integration test suites', () => {
  describe('#topics', () => {
    it('should get topics correctly', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.getTopics = jest.fn().mockResolvedValueOnce(mockGetTopicsSuccessResponse.data);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_TOPICS });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getTopics).toBeCalledWith(undefined);
    });
  });

  describe('#topic', () => {
    it('should get topic by id correctly', async () => {
      const { server, cnodeAPI } = constructTestServer();
      cnodeAPI.getTopicById = jest.fn().mockResolvedValueOnce(mockGetTopicByIdSuccessResponse.data);
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_TOPIC_BY_ID, variables: { id: '1' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getTopicById).toBeCalledWith('1');
    });
  });
});
