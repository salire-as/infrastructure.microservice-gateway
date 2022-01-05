"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectQueueTransporter = void 0;
const common_1 = require("@nestjs/common");
const queue_transporter_utils_1 = require("./queue-transporter.utils");
const InjectQueueTransporter = (name) => (0, common_1.Inject)((0, queue_transporter_utils_1.createTransporterToken)(name));
exports.InjectQueueTransporter = InjectQueueTransporter;
