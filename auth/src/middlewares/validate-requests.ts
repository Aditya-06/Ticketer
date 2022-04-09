import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';

// a generic request validating middleware
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // did some error occur during validation?
  const errors = validationResult(req);
  // if the express-validators has found any errors, send appropriate error message
  // for any errors regarding the request body, we have created a
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
