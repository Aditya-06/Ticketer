// type of the validation error given by express-validator
import { ValidationError } from 'express-validator';

// we create a sub-class of errors to handle bad requests to produce more meaningful error messages
export class RequestValidationError extends Error {
  // we are using express-validator packages validation error type as the building block
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
