// import express from 'express';
// // import routes from './routes/route';

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // app.use('/api/user', routes);

// app.get('/api/users/currentUser', (req, res) => {
//   console.log('API called');
//   res.send('Hello there!');
// });

// app.get('/', (req, res) => {
//   console.log('API called');
//   res.send('Hello there!');
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

import express from 'express';
// import { json } from 'body-parser';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});
