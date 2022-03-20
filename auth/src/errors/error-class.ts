// interface to make sure we are using the standard structure across all custom errors
// Option 2: we could use an abstract class
// export interface CustomError {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field?: string;
//   }[];
// }

// Option 2 for more clean code
export abstract class CustomError extends Error {
  // sub class must have statusCode
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // sub class must have serialize error
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
