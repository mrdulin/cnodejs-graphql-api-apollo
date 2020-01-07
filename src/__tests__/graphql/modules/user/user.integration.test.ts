import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../../__utils';
import {
  mockGetUserSuccessResponse,
  mockValidateAccessTokenSuccessResponse,
} from '../../../../graphql/api/__tests__/fixtures';
import * as Q from './fixtures/queries';

describe('user integration test suites', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('Query#user', () => {
    it('should get user by loginname', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      cnodeAPI.getUser = jest.fn().mockResolvedValueOnce(mockGetUserSuccessResponse.data);
      const res = await query({ query: Q.GET_USER_BY_LOGINNAME, variables: { loginname: 'mrdulin' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getUser).toBeCalledWith('mrdulin');
    });

    it('should return errors if get user failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      const mError = new Error('some error');
      cnodeAPI.getUser = jest.fn().mockRejectedValueOnce(mError);
      const res = await query({ query: Q.GET_USER_BY_LOGINNAME, variables: { loginname: 'mrdulin' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getUser).toBeCalledWith('mrdulin');
    });

    it('should get partial user info', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      cnodeAPI.getUser = jest.fn().mockResolvedValueOnce(mockGetUserSuccessResponse.data);
      const res = await query({ query: Q.GET_USER_BY_LOGINNAME_PARTIAL, variables: { loginname: 'mrdulin' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI.getUser).toBeCalledWith('mrdulin');
    });

    it('should throw error if no loginname parameter passed in', async () => {
      const { server } = constructTestServer();
      const { query } = createTestClient(server as any);
      const res = await query({ query: Q.GET_USER_BY_LOGINNAME_PARTIAL });
      expect(res).toMatchSnapshot();
    });

    it('should return an default user if loginname is empty string', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      expect(jest.isMockFunction(cnodeAPI.getUser)).toBeFalsy();
      cnodeAPI['get'] = jest.fn().mockResolvedValueOnce(mockGetUserSuccessResponse);
      const res = await query({ query: Q.GET_USER_BY_LOGINNAME_PARTIAL, variables: { loginname: '' } });
      expect(res).toMatchSnapshot();
      expect(cnodeAPI['get']).not.toBeCalled();
    });
  });

  describe('Query#accesstoken', () => {
    it('should validate access token correctly', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      cnodeAPI.validateAccessToken = jest.fn().mockResolvedValueOnce(mockValidateAccessTokenSuccessResponse);
      const res = await query({ query: Q.VALIDATE_ACCESS_TOKEN, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
    });

    it('should return error if validate access token failure', async () => {
      const { server, cnodeAPI } = constructTestServer();
      const { query } = createTestClient(server as any);
      const mError = new Error('some error');
      cnodeAPI.validateAccessToken = jest.fn().mockRejectedValueOnce(mError);
      const res = await query({ query: Q.VALIDATE_ACCESS_TOKEN, variables: { accesstoken: '123' } });
      expect(res).toMatchSnapshot();
    });
  });
});
