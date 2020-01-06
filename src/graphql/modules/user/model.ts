// tslint:disable: variable-name
import { IUser } from './interface';
import { IBaseTopic } from '../topic';
import { IBaseReply } from '../reply';

export class User implements IUser {
  public loginname: string = '';
  public avatar_url: string = '';
  public githubUsername: string = '';
  public create_at: string = new Date().toUTCString();
  public score: number = 0;
  public recent_topics: IBaseTopic[] = [];
  public recent_replies: IBaseReply[] = [];

  public toObject(): IUser {
    return Object.keys(this).reduce((obj, key) => {
      obj[key] = this[key];
      return obj;
    }, {} as IUser);
  }
}
