import { CustomError } from './error-class';

// error handler for all those errors regarding improper request bodies
export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  // we want any errors sent ot follow the standard error structure
  // we want to standardize it in the error class itself instead of the error handler for more generic code
  serializeErrors() {
    return [{ message: this.message }];
  }
}
