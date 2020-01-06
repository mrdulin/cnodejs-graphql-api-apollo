import { RESTDataSource } from 'apollo-datasource-rest';
import { Tab, ITopic, IReply } from '../modules/topic';
import { IUser, User, IBaseUser } from '../modules/user';

interface IGetTopicsParameters {
  page: number;
  tab: Tab;
  limit: number;
  mdrender: string;
}

interface IResponse<Data> {
  success: boolean;
  data: Data;
}

interface IValidateAccessTokenResponse extends IBaseUser {
  success: boolean;
  id: string;
}

export class CnodeAPI extends RESTDataSource {
  constructor() {
    super();
  }

  get baseURL(): string {
    return this.context.CNODE_API_BASE_URL;
  }

  public async getTopics(params?: Partial<IGetTopicsParameters>): Promise<ITopic[]> {
    return this.get(`${this.baseURL}/topics`, params).then((res: IResponse<ITopic[]>) => {
      return res.success ? res.data : [];
    });
  }

  public async getTopicById(id: string): Promise<ITopic & { replies: IReply[] }> {
    return this.get(`${this.baseURL}/topic/${id}`).then((res: IResponse<ITopic & { replies: IReply[] }>) => {
      return res.success ? res.data : ({} as ITopic & { replies: IReply[] });
    });
  }

  public async getUser(loginname: string): Promise<IUser> {
    return this.get(`${this.baseURL}/user/${loginname}`).then((res: IResponse<IUser>) => {
      return res.success ? res.data : new User().toObject();
    });
  }

  public async validateAccessToken(accesstoken: string): Promise<IValidateAccessTokenResponse> {
    return this.post(`${this.baseURL}/accesstoken`, { accesstoken });
  }
}
