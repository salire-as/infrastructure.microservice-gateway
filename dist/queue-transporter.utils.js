"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransporterToken = void 0;
const createTransporterToken = (name) => {
    return `${name.toUpperCase()}_TRANSPORTER`;
};
exports.createTransporterToken = createTransporterToken;
