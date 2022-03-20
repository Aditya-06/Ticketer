import express from 'express';
// import library to overwrite 'next' behaviour of express in async functions
import 'express-async-errors';

// import routes
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
