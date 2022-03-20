import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
  async (req: Request, res: Response) => {
    console.log('API called');

    // did some error occur during validation?
    const errors = validationResult(req);

    // if the express-validators has found any errors, send appropriate error message
    // for any errors regarding the request body, we have created a
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating a User.');
    throw new DatabaseConnectionError();
  }
);

export { router as signupRouter };
