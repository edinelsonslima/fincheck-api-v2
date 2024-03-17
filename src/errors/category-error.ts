import { enStatusCode } from '@enums/status-code';
import { DomainError } from './domain';

export class CategoryError extends DomainError {
  constructor(
    message: string = 'category-error',
    code: enStatusCode = enStatusCode.BAD_REQUEST,
    data: object = {}
  ) {
    super(message, code, data);
  }
}
