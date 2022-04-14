import express from 'express';
// import library to overwrite 'next' behaviour of express in async functions
import 'express-async-errors';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

// import routes
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

// stuff to do with errors
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

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

// API logger
app.use(morgan('tiny'));
// use all the routes created
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);

// in case the route hit does not exist
// in case of async, express relies on next() to handle errors
app.all('*', async (req, res, next) => {
  console.log('Not found');
  throw new NotFoundError();
});

// error-handler
app.use(errorHandler);

export { app };
