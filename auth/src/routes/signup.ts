import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import {
  DatabaseConnectionError,
  BadRequestError,
  validateRequest,
} from '@aaticketer/common';

import { User } from '../models/User';

const router = express.Router();

router.post(
  '/api/users/signup',
  // express-validator checks if email and password are accurately provided
  [
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be 6-20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email in use');
      throw new BadRequestError('Email already in use');
    }

    console.log('Creating a User.');

    // try {
    const user = User.build({ email, password });
    await user.save();

    // generate JSON web token
    const userjwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // we overwrite TS checking because we have already made a check for this in the DB file
      process.env.JWT_KEY!
    );

    // store token in session object
    req.session = {
      jwt: userjwt,
    };

    res.statusCode = 201;
    return res.send(user);
  }
);

export { router as signupRouter };
