"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QueueTransporterModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueTransporterModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("./constants");
const queue_transporter_factory_1 = require("./queue-transporter.factory");
const queue_transporter_utils_1 = require("./queue-transporter.utils");
let QueueTransporterModule = QueueTransporterModule_1 = class QueueTransporterModule {
    static forRoot(clients) {
        const ClientsFactory = microservices_1.ClientsModule.register(clients);
        const ClientTransporters = this.createTransporters(clients);
        return {
            module: QueueTransporterModule_1,
            imports: [ClientsFactory],
            providers: ClientTransporters,
            exports: [ClientsFactory, ...ClientTransporters],
        };
    }
    static forRootAsync(clients, options) {
        const clientsFactory = microservices_1.ClientsModule.register(clients);
        const clientTransporters = this.createTransporters(clients);
        const asyncFactory = this.createAsyncFactory(options);
        return {
            module: QueueTransporterModule_1,
            imports: [...(options.imports || []), clientsFactory],
            providers: [asyncFactory, ...clientTransporters],
            exports: clientTransporters,
        };
    }
    static createTransporters(clients) {
        const factories = [];
        for (const client of clients) {
            const CLIENT_NAME = client.name;
            const factory = {
                provide: (0, queue_transporter_utils_1.createTransporterToken)(CLIENT_NAME),
                useFactory: (client, options) => {
                    return (0, queue_transporter_factory_1.queueTransporterFactory)(client, options);
                },
                inject: [CLIENT_NAME, constants_1.QUEUE_TRANSPORT_FACTORY],
            };
            factories.push(factory);
        }
        return factories;
    }
    static createAsyncFactory(options) {
        return {
            provide: constants_1.QUEUE_TRANSPORT_FACTORY,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
};
QueueTransporterModule = QueueTransporterModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], QueueTransporterModule);
exports.QueueTransporterModule = QueueTransporterModule;
