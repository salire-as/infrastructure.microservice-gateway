"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueTransporter = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
class QueueTransporter {
    client;
    options;
    constructor(client, options) {
        this.client = client;
        this.options = options;
    }
    logger = new common_1.Logger(QueueTransporter.name);
    emit(request) {
        const { cmd, payload } = request;
        const data = {
            payload,
        };
        this.options?.middleware?.(request, data);
        const observer = this.client.emit(cmd, data);
        this.logger.debug(`[RPC] [EMITTED] ${cmd}`, { request: data });
        return observer;
    }
    emitMany({ cmd, payloads, organization, user }) {
        for (const payload of payloads) {
            this.emit({ cmd, payload, organization, user });
        }
    }
    async request(request) {
        const { cmd, payload } = request;
        const data = {
            payload,
        };
        this.options?.middleware?.(request, data);
        const observer = this.client.send(cmd, data);
        const response = await (0, rxjs_1.firstValueFrom)(observer);
        this.logger.debug(`[RPC] [RESPONSE] ${cmd}`, {
            request: data,
            response,
        });
        return response;
    }
}
exports.QueueTransporter = QueueTransporter;
