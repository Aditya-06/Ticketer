import { CustomError } from './error-class';

// error handler for all those errors regarding the database and its connectivity
export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to the Database.';

  constructor() {
    super('Database error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  // we want any errors sent ot follow the standard error structure
  // we want to standardize it in the error class itself instead of the error handler for more generic code
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
