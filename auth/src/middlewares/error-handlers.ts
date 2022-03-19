import { Response, Request, NextFunction } from 'express';

// since we have microservices (Many backends) and only one react frontend, we need a consistent way of sending error messages
// therefore here we'll create an error handling function which will be re-useable across various ms
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Something went wrong: ${err.message}`);
  return res.status(400).send({ message: 'Something went wrong' });
};
