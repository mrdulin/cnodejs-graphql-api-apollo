import { IBaseTopic, IBaseReply } from '../topic';

export interface IBaseUser {
  loginname: string;
  avatar_url: string;
}

export interface IUser extends IBaseUser {
  loginname: string;
  avatar_url: string;
  githubUsername: string;
  create_at: string;
  score: number;
  recent_topics: IBaseTopic[];
  recent_replies: IBaseReply[];
}
