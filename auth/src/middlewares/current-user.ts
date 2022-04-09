import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// Reach into the existing type def and modify it
// here we modify it to accomodate the currentUser property
declare global {
  namespace Express {
    interface Request {
      // currentuser may or may not be defined
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if the jwt has been set in the session
  // we check if req.session exists cause TS throws an errot stating it could be null
  if (!req.session?.jwt) {
    return next();
  }

  // decode the jwt
  try {
    // assign the type UserPayload to the properties
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
