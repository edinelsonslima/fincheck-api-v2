import { enStatusCode } from '@enums/status-code';
import { DomainError } from './domain';

export class UserError extends DomainError {
  constructor(
    message: string = 'user-error',
    code: enStatusCode = enStatusCode.BAD_REQUEST,
    data: object = {}
  ) {
    super(message, code, data);
  }
}
