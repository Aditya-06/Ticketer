import mongoose from 'mongoose';

export const startDb = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Database running');
  } catch (error) {
    console.log(error);
  }
};
