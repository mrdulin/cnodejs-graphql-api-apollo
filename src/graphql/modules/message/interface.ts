import { IBaseUser } from '../user';
import { IBaseTopic } from '../topic';
import { IMessageReply } from '../reply';

export interface IMessage {
  id: string;
  type: string;
  has_read: boolean;
  author: IBaseUser;
  topic: IBaseTopic;
  reply: IMessageReply;
}
