import { RESTDataSource } from 'apollo-datasource-rest';
import { Tab, ITopic } from '../modules/topic';
import { IUser, User, IBaseUser } from '../modules/user';
import { IMessage } from '../modules/message';
import { IReply } from '../modules/reply';
import _ from 'lodash';
import { AuthenticationError } from 'apollo-server';

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

interface IMessagesResponse {
  has_read_messages: IMessage[];
  hasnot_read_messages: IMessage[];
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
    if (!loginname) {
      return new User().toObject();
    }
    return this.get(`${this.baseURL}/user/${loginname}`).then((res: IResponse<IUser>) => {
      return res.success ? res.data : new User().toObject();
    });
  }

  public async validateAccessToken(accesstoken: string): Promise<IBaseUser & { id: string }> {
    return this.post(`${this.baseURL}/accesstoken`, { accesstoken }).then((res) => {
      return res.success
        ? _.omit<IBaseUser & { id: string; success: boolean }, 'success'>(res, ['success'])
        : { loginname: '', id: '', avatar_url: '' };
    });
  }

  public async getMessageCount(accesstoken: string): Promise<number> {
    return this.get(`${this.baseURL}/message/count`, { accesstoken }).then((res: IResponse<number>) => {
      return res.success ? res.data : 0;
    });
  }

  public async getMessages(accesstoken: string, mdrender: boolean = true): Promise<IMessagesResponse> {
    if (!accesstoken) {
      throw new AuthenticationError('accesstoken invalid');
    }
    return this.get(`${this.baseURL}/messages`, { accesstoken, mdrender }).then((res: IResponse<IMessagesResponse>) => {
      return res.success ? res.data : { has_read_messages: [], hasnot_read_messages: [] };
    });
  }

  public async markAllMessages(accesstoken: string): Promise<Array<{ id: string }>> {
    return this.post(`${this.baseURL}/message/mark_all`, { accesstoken }).then((res) => {
      return res.success ? res.marked_msgs : [];
    });
  }

  public async markOneMessage(accesstoken: string, msgId: string): Promise<string> {
    return this.post(`${this.baseURL}/message/mark_one/${msgId}`, { accesstoken }).then((res) => {
      return res.success ? res.marked_msg_id : '';
    });
  }

  public async collectTopic(accesstoken: string, topicId: string): Promise<{ success: boolean }> {
    return this.post(`${this.baseURL}/topic_collect/collect`, { accesstoken, topic_id: topicId });
  }

  public async deCollectTopic(accesstoken: string, topicId: string): Promise<{ success: boolean }> {
    return this.post(`${this.baseURL}/topic_collect/de_collect`, { accesstoken, topic_id: topicId });
  }

  public async getCollectedTopics(loginname: string): Promise<ITopic[]> {
    return this.get(`${this.baseURL}/topic_collect/${loginname}`).then((res: IResponse<ITopic[]>) => {
      return res.success ? res.data : [];
    });
  }
}
