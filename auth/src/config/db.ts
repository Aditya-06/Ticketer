import mongoose from 'mongoose';

export const startDb = async () => {
  // we should check for all env varibales when we start the app to prevent errors later
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Database running');
  } catch (error) {
    console.log(error);
  }
};
