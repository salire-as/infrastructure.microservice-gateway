/// <reference types="mongoose" />
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceGateway } from './microservice-gateway.class';
export declare const microserviceGatewayTransporterFactory: (client: ClientProxy, options: any) => MicroserviceGateway<import("mongoose").AnyObject>;
