import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// cannot call this route without signing
router.get(
  '/api/users/currentUser',
  currentUser,
  (req: Request, res: Response) => {
    // pass through middleware and send currentUser or null
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
