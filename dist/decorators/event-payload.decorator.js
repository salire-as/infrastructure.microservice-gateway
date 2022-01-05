"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventPayload = void 0;
const common_1 = require("@nestjs/common");
const microservice_gateway_utils_1 = require("../microservice-gateway.utils");
exports.GetEventPayload = (0, common_1.createParamDecorator)((value, context) => {
    const request = (0, microservice_gateway_utils_1.getRequestFromExecutionContext)(context);
    const payload = request.payload;
    return (0, microservice_gateway_utils_1.formatEventPayload)(payload);
});
