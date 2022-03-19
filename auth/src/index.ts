import express from 'express';

// import routes
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handlers';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use all the routes created
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);

// error-handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
