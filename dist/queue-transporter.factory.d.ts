/// <reference types="mongoose" />
import { ClientProxy } from '@nestjs/microservices';
import { QueueTransporter } from './queue-transporter.class';
export declare const queueTransporterFactory: (client: ClientProxy, options: any) => QueueTransporter<import("mongoose").AnyObject>;
