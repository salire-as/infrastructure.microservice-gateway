import { ClientProxy } from '@nestjs/microservices';
import { AnyObject } from 'mongoose';
import { EmitEvent, EmitManyEvents, TransportOptionMethods } from './types/transporter';
export declare class MicroserviceGateway<CommandModel extends AnyObject> {
    private readonly client;
    private readonly options?;
    constructor(client: ClientProxy, options?: TransportOptionMethods | undefined);
    private logger;
    emit<Command extends keyof CommandModel>(request: EmitEvent<Command, CommandModel[Command]>): import("rxjs").Observable<any>;
    emitMany<Command extends keyof CommandModel>({ cmd, payloads, organization, user }: EmitManyEvents<Command, CommandModel[Command]>): void;
    request<Command extends keyof CommandModel>(request: EmitEvent<Command, CommandModel[Command]>): Promise<any>;
}
