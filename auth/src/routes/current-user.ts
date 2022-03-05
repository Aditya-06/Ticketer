import express from 'express';

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
  console.log('API called');
  res.send('Hello there!');
});

export { router as currentUserRouter };
