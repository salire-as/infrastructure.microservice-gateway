import { DynamicModule } from '@nestjs/common';
import { ClientProviderOptions } from '@nestjs/microservices';
import { AsyncQueueTransporterFactory } from './types/queue-transporter';
export declare class QueueTransporterModule {
    static forRoot(clients: ClientProviderOptions[]): DynamicModule;
    static forRootAsync(clients: ClientProviderOptions[], options: AsyncQueueTransporterFactory): DynamicModule;
    private static createTransporters;
    private static createAsyncFactory;
}
