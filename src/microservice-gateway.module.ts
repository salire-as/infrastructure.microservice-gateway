import { Module, DynamicModule, Global, FactoryProvider } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_GATEWAY_TRANSPORT_FACTORY } from './microservice-gateway.constants';
import { microserviceGatewayTransporterFactory } from './microservice-gateway-transporter-factory';
import { createTransporterToken } from './microservice-gateway.utils';
import { AsyncTransporterFactory } from './types/transporter';

@Global()
@Module({})
export class MicroserviceGatewayModule {
  public static forRoot(clients: ClientProviderOptions[]): DynamicModule {
    const ClientsFactory = ClientsModule.register(clients);

    const ClientTransporters = this.createTransporters(clients);

    return {
      module: MicroserviceGatewayModule,
      imports: [ClientsFactory],
      providers: ClientTransporters,
      exports: [ClientsFactory, ...ClientTransporters],
    };
  }

  public static forRootAsync(clients: ClientProviderOptions[], options?: AsyncTransporterFactory): DynamicModule {
    const clientsFactory = ClientsModule.register(clients);

    const clientTransporters = this.createTransporters(clients);

    const imports = [clientsFactory];
    const providers = clientTransporters;

    if (options) {
      if (options.imports) {
        imports.push(...(options.imports || []));
      }
      providers.push(this.createAsyncFactory(options));
    }

    return {
      module: MicroserviceGatewayModule,
      imports,
      providers,
      exports: clientTransporters,
    };
  }

  private static createTransporters(clients: ClientProviderOptions[]) {
    const factories: FactoryProvider[] = [];

    for (const client of clients) {
      const CLIENT_NAME = client.name as string;

      const factory: FactoryProvider = {
        provide: createTransporterToken(CLIENT_NAME),
        useFactory: (client, options) => microserviceGatewayTransporterFactory(client, options),
        inject: [CLIENT_NAME, MICROSERVICE_GATEWAY_TRANSPORT_FACTORY],
      };

      factories.push(factory);
    }

    return factories;
  }

  private static createAsyncFactory(options: AsyncTransporterFactory) {
    return {
      provide: MICROSERVICE_GATEWAY_TRANSPORT_FACTORY,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
