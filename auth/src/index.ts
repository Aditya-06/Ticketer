import { app } from './app';
// Database configurations
import { startDb } from './config/db';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect the server to the database
    await startDb();
  } catch (error) {}
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
