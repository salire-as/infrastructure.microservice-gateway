import { ClientProxy } from '@nestjs/microservices';
import { AnyObject } from 'mongoose';
import { firstValueFrom, timeout } from 'rxjs';
import { REQUEST_TIMEOUT } from './microservice-gateway.constants';
import { EmitEvent, EmitManyEvents, TransportOptionMethods } from './types/transporter';

export class MicroserviceGateway<CommandModel extends AnyObject> {
  constructor(private readonly client: ClientProxy, private readonly options?: TransportOptionMethods) {}

  public emit<Command extends keyof CommandModel>(request: EmitEvent<Command, CommandModel[Command]>) {
    const { cmd, payload } = request;

    const data = {
      payload,
    };

    this.options?.middleware?.(request, data);

    const observer = this.client.emit(cmd, data);

    return observer;
  }

  public emitMany<Command extends keyof CommandModel>({ cmd, payloads, organization, user }: EmitManyEvents<Command, CommandModel[Command]>) {
    for (const payload of payloads) {
      this.emit({ cmd, payload, organization, user });
    }
  }

  public async request<Command extends keyof CommandModel>(request: EmitEvent<Command, CommandModel[Command]>) {
    const { cmd, payload } = request;

    const data = {
      payload,
    };

    this.options?.middleware?.(request, data);

    const observer = this.client.send(cmd, data).pipe(timeout(REQUEST_TIMEOUT));

    const response = await firstValueFrom(observer);

    return response;
  }
}
