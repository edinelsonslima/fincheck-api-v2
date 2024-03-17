import { enStatusCode } from '@enums/status-code';
import { DomainError } from './domain';

export class TransactionError extends DomainError {
  constructor(
    message: string = 'transaction-error',
    code: enStatusCode = enStatusCode.BAD_REQUEST,
    data: object = {}
  ) {
    super(message, code, data);
  }
}
