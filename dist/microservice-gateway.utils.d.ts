import { ExecutionContext } from '@nestjs/common';
import { AnyObject } from 'mongoose';
export declare const createTransporterToken: (name: string) => string;
export declare const getRequestFromExecutionContext: (context: ExecutionContext) => any;
export declare const formatEventPayload: <T>(payload: AnyObject) => T;
