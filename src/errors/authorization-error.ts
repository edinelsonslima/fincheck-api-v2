import { enStatusCode } from '@enums/status-code';
import { DomainError } from './domain';

export class AuthorizationError extends DomainError {
  constructor(message: string = 'unauthorized', data: object = {}) {
    super(message, enStatusCode.UNAUTHORIZED, data);
  }
}
