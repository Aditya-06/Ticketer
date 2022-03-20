// error handler for all those errors regarding the database and its connectivity
export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to the Database.';
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
