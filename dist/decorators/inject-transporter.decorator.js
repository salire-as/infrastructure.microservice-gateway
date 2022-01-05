"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectTransporter = void 0;
const common_1 = require("@nestjs/common");
const microservice_gateway_utils_1 = require("../microservice-gateway.utils");
const InjectTransporter = (name) => (0, common_1.Inject)((0, microservice_gateway_utils_1.createTransporterToken)(name));
exports.InjectTransporter = InjectTransporter;
