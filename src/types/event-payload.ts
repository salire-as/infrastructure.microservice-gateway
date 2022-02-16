import { AnyObject } from 'mongoose';

export type EventPayload<Command extends keyof QueueModel, QueueModel extends AnyObject> = QueueModel[Command];
