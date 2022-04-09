import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-requests';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signIn',
  [
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password').trim().notEmpty().withMessage('Must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if such a user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // Check if the passwords match
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const userjwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // we overwrite TS checking because we have already made a check for this in the DB file
      process.env.JWT_KEY!
    );

    // store token in session object
    req.session = {
      jwt: userjwt,
    };

    return res.send(existingUser);
  }
);

export { router as signInRouter };
