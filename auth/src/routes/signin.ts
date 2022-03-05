import express from 'express';

const router = express.Router();

router.post('/api/users/signIn', (req, res) => {
  console.log('API called');
  res.send('Hello there!');
});

export { router as signInRouter };
