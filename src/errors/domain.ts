import { enStatusCode } from '@enums/status-code';

export class DomainError extends Error {
  constructor(
    message: string = 'domain-error',
    private readonly code: enStatusCode = enStatusCode.BAD_REQUEST,
    private readonly data: object = {}
  ) {
    console.log(code, `=> ${message}`);
    Object.keys(data).length && console.log(JSON.stringify(data, null, 2));
    super(message);
  }

  public toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
