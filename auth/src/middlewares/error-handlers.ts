import { Response, Request, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

// since we have microservices (Many backends) and only one react frontend, we need a consistent way of sending error messages
// therefore here we'll create an error handling function which will be re-useable across various ms
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // here we are checking what kind of error has been thrown
  if (err instanceof RequestValidationError) {
    console.log('Request validation error');
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('Database connection error');
  }
  console.log(`Something went wrong: ${err.message}`);
  return res.status(400).send({ message: 'Something went wrong' });
};
