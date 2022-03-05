import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use all the routes created
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
