import { IUser } from '../user/interface';

export enum Tab {
  ASK = 'ask',
  SHARE = 'share',
  JOB = 'job',
  GOOD = 'good',
}

export interface ITopic {
  id: string;
  author_id: string;
  tab: Tab;
  content: string;
  title: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: IUser;
}

export interface IReply {
  id: string;
  author: IUser;
  content: string;
  ups: string[];
  create_at: string;
  reply_id: string;
  is_uped: boolean;
}
