import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequestFromExecutionContext, formatEventPayload } from '../microservice-gateway.utils';

export const GetEventPayload = createParamDecorator((value: void, context: ExecutionContext) => {
  const request = getRequestFromExecutionContext(context);
  const payload = request.payload;
  return formatEventPayload(payload);
});
