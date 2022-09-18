import express from 'express';
// import library to overwrite 'next' behaviour of express in async functions
import 'express-async-errors';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

// import our custom package
import { errorHandler, NotFoundError, currentUser } from '@aaticketer/common';

// Import routes
import { createTicketRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // during testing, secure needs to be false for the cookie to be set
    secure: process.env.NODE_ENV !== 'test',
  })
);

// Use the middleware imported
app.use(currentUser);

// API logger
app.use(morgan('tiny'));

app.use(createTicketRouter);

// in case the route hit does not exist
// in case of async, express relies on next() to handle errors
app.all('*', async (req, res, next) => {
  console.log('Not found');
  throw new NotFoundError();
});

// error-handler
app.use(errorHandler);

export { app };
