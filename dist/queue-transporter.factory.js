"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueTransporterFactory = void 0;
const queue_transporter_class_1 = require("./queue-transporter.class");
const queueTransporterFactory = (client, options) => {
    return new queue_transporter_class_1.QueueTransporter(client, options);
};
exports.queueTransporterFactory = queueTransporterFactory;
