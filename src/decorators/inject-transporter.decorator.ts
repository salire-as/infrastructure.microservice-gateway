import { Inject } from '@nestjs/common';
import { createTransporterToken } from '../microservice-gateway.utils';

export const InjectTransporter = (name: string) => Inject(createTransporterToken(name));
