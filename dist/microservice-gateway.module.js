"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MicroserviceGatewayModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroserviceGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const microservice_gateway_constants_1 = require("./microservice-gateway.constants");
const microservice_gateway_transporter_factory_1 = require("./microservice-gateway-transporter-factory");
const microservice_gateway_utils_1 = require("./microservice-gateway.utils");
let MicroserviceGatewayModule = MicroserviceGatewayModule_1 = class MicroserviceGatewayModule {
    static forRoot(clients) {
        const ClientsFactory = microservices_1.ClientsModule.register(clients);
        const ClientTransporters = this.createTransporters(clients);
        return {
            module: MicroserviceGatewayModule_1,
            imports: [ClientsFactory],
            providers: ClientTransporters,
            exports: [ClientsFactory, ...ClientTransporters],
        };
    }
    static forRootAsync(clients, options) {
        const clientsFactory = microservices_1.ClientsModule.register(clients);
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
            module: MicroserviceGatewayModule_1,
            imports,
            providers,
            exports: clientTransporters,
        };
    }
    static createTransporters(clients) {
        const factories = [];
        for (const client of clients) {
            const CLIENT_NAME = client.name;
            const factory = {
                provide: (0, microservice_gateway_utils_1.createTransporterToken)(CLIENT_NAME),
                useFactory: (client, options) => (0, microservice_gateway_transporter_factory_1.microserviceGatewayTransporterFactory)(client, options),
                inject: [CLIENT_NAME, microservice_gateway_constants_1.MICROSERVICE_GATEWAY_TRANSPORT_FACTORY],
            };
            factories.push(factory);
        }
        return factories;
    }
    static createAsyncFactory(options) {
        return {
            provide: microservice_gateway_constants_1.MICROSERVICE_GATEWAY_TRANSPORT_FACTORY,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
};
MicroserviceGatewayModule = MicroserviceGatewayModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], MicroserviceGatewayModule);
exports.MicroserviceGatewayModule = MicroserviceGatewayModule;
