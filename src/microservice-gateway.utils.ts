import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { isString, isArray, isPlainObject } from 'lodash';
import { AnyObject, isValidObjectId, Types } from 'mongoose';
import { isDateString } from 'class-validator';

export const createTransporterToken = (name: string) => {
  return `${name.toUpperCase()}_TRANSPORTER`;
};

export const getRequestFromExecutionContext = (context: ExecutionContext) => {
  const type = context.getType();
  if (type === 'http') {
    return context.switchToHttp().getRequest();
  } else if (type === 'rpc') {
    return context.switchToRpc().getData();
  } else if ((type as string) === 'graphql') {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    return gqlExecutionContext.getContext().req;
  } else throw new HttpException(`ContextType ${type} is not supported in getRequestFromExecutionContext`, HttpStatus.INTERNAL_SERVER_ERROR);
};

export const formatEventPayload = <T>(payload: AnyObject): T => {
  let updatedPayload = payload;
  if (isString(updatedPayload)) {
    if (isValidObjectId(updatedPayload)) {
      updatedPayload = new Types.ObjectId(updatedPayload);
    } else if (isDateString(updatedPayload)) {
      updatedPayload = new Date(updatedPayload);
    }
  } else if (isArray(updatedPayload)) {
    let index = 0;
    for (const item of updatedPayload) {
      updatedPayload[index] = formatEventPayload(item);
      index++;
    }
  } else if (isPlainObject(updatedPayload)) {
    for (const key in updatedPayload) {
      updatedPayload[key] = formatEventPayload(updatedPayload[key]);
    }
  }
  return updatedPayload as T;
};
