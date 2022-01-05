import { AnyObject } from 'mongoose';
export declare type EventPayload<Command extends keyof QueueModel, QueueModel extends AnyObject> = QueueModel[Command];
