import mongoose from 'mongoose';

export const startDb = async () => {
  // we should check for all env varibales when we start the app to prevent errors later
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Database running');
  } catch (error) {
    console.log(error);
  }
};
