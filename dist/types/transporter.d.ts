import { AnyObject, Types } from 'mongoose';
export interface EmitEvent<Command, Payload extends AnyObject> {
    cmd: Command;
    payload: Payload;
    organization?: Types.ObjectId;
    user?: Types.ObjectId;
}
export interface EmitManyEvents<Command, Payload extends AnyObject> extends Omit<EmitEvent<Command, Payload>, 'payload'> {
    payloads: Payload[];
}
export interface TransportOptionMethods {
    middleware?: <T, P>(request: EmitEvent<T, P>, data: Record<string, unknown>) => void;
}
export interface AsyncTransporterFactory {
    useFactory: (...args: any[]) => TransportOptionMethods;
    inject?: any[];
    imports?: any[];
}
