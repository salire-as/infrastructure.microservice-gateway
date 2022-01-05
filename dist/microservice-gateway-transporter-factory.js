"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.microserviceGatewayTransporterFactory = void 0;
const microservice_gateway_class_1 = require("./microservice-gateway.class");
const microserviceGatewayTransporterFactory = (client, options) => {
    return new microservice_gateway_class_1.MicroserviceGateway(client, options);
};
exports.microserviceGatewayTransporterFactory = microserviceGatewayTransporterFactory;
