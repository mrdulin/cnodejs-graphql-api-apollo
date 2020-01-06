import { constructTestServer } from '../../../__utils';
import { createTestClient } from 'apollo-server-testing';
import * as Q from './fixtures/queries';
import { mockGetTopicsSuccessResponse } from '../../../../graphql/api/__tests__/fixtures';

describe('topic integration test suites', () => {
  it('should get topics correctly', async () => {
    const { server, cnodeAPI } = constructTestServer();
    cnodeAPI.getTopics = jest.fn().mockResolvedValueOnce(mockGetTopicsSuccessResponse.data);
    const { query } = createTestClient(server as any);
    const res = await query({ query: Q.GET_TOPICS });
    expect(res).toMatchSnapshot();
    expect(cnodeAPI.getTopics).toBeCalledWith(undefined);
  });
});
