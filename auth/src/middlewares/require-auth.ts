import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors/not-authorized-error';

// we shall assume this is callled after the current User middleware
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if currentUser has not been set, then user has not signed in
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
