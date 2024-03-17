import { enStatusCode } from '@enums/status-code';
import { DomainError } from './domain';

export class ValidatorError extends DomainError {
  constructor(
    message: string = 'invalid data',
    code: enStatusCode = enStatusCode.BAD_REQUEST,
    data: object = {}
  ) {
    super(message, code, data);
  }
}
