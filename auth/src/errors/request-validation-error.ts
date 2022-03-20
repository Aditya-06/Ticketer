// type of the validation error given by express-validator
import { ValidationError } from 'express-validator';
import { CustomError } from './error-class';

// we create a sub-class of errors to handle bad requests to produce more meaningful error messages
// To make sure it's correctly written, we implement our custom interface
export class RequestValidationError extends CustomError {
  statusCode = 400;
  // we are using express-validator packages validation error type as the building block
  constructor(public errors: ValidationError[]) {
    super('Validation error');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    // since validationErrors from express-validator returns an array of objects, we map over ir
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
