import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../errors/error-class';

// since we have microservices (Many backends) and only one react frontend, we need a consistent way of sending error messages
// therefore here we'll create an error handling function which will be re-useable across various ms
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // here we are checking what kind of error has been thrown
  // if it is an error we have a custom class for, handle appropraitely
  if (err instanceof CustomError) {
    // return the standard error mesaage to the user -> the standarization is done in the error class itself
    console.log('Custom error');
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  // Generic error message if we do not know what's wrong
  console.log(`Something went wrong: ${err.message}`);
  return res
    .status(400)
    .send({ errors: [{ message: 'Something went wrong' }] });
};
