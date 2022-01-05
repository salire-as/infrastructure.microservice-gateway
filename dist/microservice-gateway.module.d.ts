import { DynamicModule } from '@nestjs/common';
import { ClientProviderOptions } from '@nestjs/microservices';
import { AsyncTransporterFactory } from './types/transporter';
export declare class MicroserviceGatewayModule {
    static forRoot(clients: ClientProviderOptions[]): DynamicModule;
    static forRootAsync(clients: ClientProviderOptions[], options?: AsyncTransporterFactory): DynamicModule;
    private static createTransporters;
    private static createAsyncFactory;
}
