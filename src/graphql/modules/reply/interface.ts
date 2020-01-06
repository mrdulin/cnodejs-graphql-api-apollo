import { IBaseUser, IUser } from '../user';

export interface IBaseReply {
  id: string;
  author: IBaseUser;
  title: string;
  last_reply_at: string;
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

export interface IMessageReply {
  id: string;
  content: string;
  ups: string[];
  create_at: string;
}
