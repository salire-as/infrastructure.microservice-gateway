"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEventPayload = exports.getRequestFromExecutionContext = exports.createTransporterToken = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const lodash_1 = require("lodash");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const createTransporterToken = (name) => {
    return `${name.toUpperCase()}_TRANSPORTER`;
};
exports.createTransporterToken = createTransporterToken;
const getRequestFromExecutionContext = (context) => {
    const type = context.getType();
    if (type === 'http') {
        return context.switchToHttp().getRequest();
    }
    else if (type === 'rpc') {
        return context.switchToRpc().getData();
    }
    else if (type === 'graphql') {
        const gqlExecutionContext = graphql_1.GqlExecutionContext.create(context);
        return gqlExecutionContext.getContext().req;
    }
    else
        throw new common_1.HttpException(`ContextType ${type} is not supported in getRequestFromExecutionContext`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
};
exports.getRequestFromExecutionContext = getRequestFromExecutionContext;
const formatEventPayload = (payload) => {
    let updatedPayload = payload;
    if ((0, lodash_1.isString)(updatedPayload)) {
        if ((0, mongoose_1.isValidObjectId)(updatedPayload)) {
            updatedPayload = new mongoose_1.Types.ObjectId(updatedPayload);
        }
        else if ((0, class_validator_1.isDateString)(updatedPayload)) {
            updatedPayload = new Date(updatedPayload);
        }
    }
    else if ((0, lodash_1.isArray)(updatedPayload)) {
        let index = 0;
        for (const item of updatedPayload) {
            updatedPayload[index] = (0, exports.formatEventPayload)(item);
            index++;
        }
    }
    else if ((0, lodash_1.isPlainObject)(updatedPayload)) {
        for (const key in updatedPayload) {
            updatedPayload[key] = (0, exports.formatEventPayload)(updatedPayload[key]);
        }
    }
    return updatedPayload;
};
exports.formatEventPayload = formatEventPayload;
