import { enStatusCode } from '@enums/status-code';
import { DomainError } from './domain';

export class BankAccountError extends DomainError {
  constructor(
    message: string = 'bank-account-error',
    code: enStatusCode = enStatusCode.BAD_REQUEST,
    data: object = {}
  ) {
    super(message, code, data);
  }
}
