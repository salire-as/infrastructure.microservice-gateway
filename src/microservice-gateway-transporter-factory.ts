import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceGateway } from './microservice-gateway.class';

export const microserviceGatewayTransporterFactory = (client: ClientProxy, options: any) => {
  return new MicroserviceGateway(client, options);
};
