import { AnyObject, Types } from 'mongoose';
import { ModuleMetadata } from '@nestjs/common';
export interface EmitEvent<Command, Payload extends AnyObject> {
    cmd: Command;
    payload: Payload;
    organization?: Types.ObjectId;
    user?: Types.ObjectId;
}
export interface TransportOptionMethods {
    middleware?: <T, P>(request: EmitEvent<T, P>, data: Record<string, unknown>) => void;
}
export interface AsyncQueueTransporterFactory extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => TransportOptionMethods;
    inject?: any[];
}
