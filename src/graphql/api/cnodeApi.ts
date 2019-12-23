import { RESTDataSource } from 'apollo-datasource-rest';
import { Tab, ITopic, IReply } from '../modules/topic';

interface IGetTopicsParameters {
  page: number;
  tab: Tab;
  limit: number;
  mdrender: string;
}

interface IBaseResponse {
  success: boolean;
}

interface IGetTopicsResponse extends IBaseResponse {
  data: ITopic[];
}

interface IGetTopicByIdResponse extends IBaseResponse {
  data: ITopic & { replies: IReply[] };
}

export class CnodeAPI extends RESTDataSource {
  constructor() {
    super();
  }

  get baseURL(): string {
    return this.context.CNODE_API_BASE_URL;
  }

  public async getTopics(params?: Partial<IGetTopicsParameters>): Promise<ITopic[]> {
    return this.get(`${this.baseURL}/topics`, params).then((res: IGetTopicsResponse) => {
      return res.success ? res.data : [];
    });
  }

  public async getTopicById(id: string): Promise<ITopic & { replies: IReply[] }> {
    return this.get(`${this.baseURL}/topic/${id}`).then((res: IGetTopicByIdResponse) => {
      return res.success ? res.data : ({} as ITopic & { replies: IReply[] });
    });
  }
}
