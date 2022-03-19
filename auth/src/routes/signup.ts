import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (req: Request, res: Response) => {
    console.log('API called');

    // did some error occur during validation?
    const errors = validationResult(req);

    // if the express-validators has found any errors, send appropriate error message
    if (!errors.isEmpty()) {
      throw new Error('Invalid username or password');
      // return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating a User.');
    throw new Error('Error connecting to DB');
    return res.send('Creating a user');
  }
);

export { router as signupRouter };
