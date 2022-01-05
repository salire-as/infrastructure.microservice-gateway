import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AnyObject } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { EmitEvent, EmitManyEvents, TransportOptionMethods } from './types/transporter';

export class MicroserviceGateway<CommandModel extends AnyObject> {
  constructor(private readonly client: ClientProxy, private readonly options?: TransportOptionMethods) {}

  private logger = new Logger(MicroserviceGateway.name);

  public emit<Command extends keyof CommandModel>(request: EmitEvent<Command, CommandModel[Command]>) {
    const { cmd, payload } = request;

    const data = {
      payload,
    };

    this.options?.middleware?.(request, data);

    const observer = this.client.emit(cmd, data);

    this.logger.debug(`[RPC] [EMITTED] ${cmd}`, { request: data });

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

    const observer = this.client.send(cmd, data);

    const response = await firstValueFrom(observer);

    this.logger.debug(`[RPC] [RESPONSE] ${cmd}`, {
      request: data,
      response,
    });

    return response;
  }
}
