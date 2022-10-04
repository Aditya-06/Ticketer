import mongoose from 'mongoose';
import { natsWrapper } from './nats-warpper';

export const startDb = async () => {
  // we should check for all env varibales when we start the app to prevent errors later
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    // Connect to nats instance
    try {
      await natsWrapper.connect('ticketing', 'seuiw', 'http://nats-srv:4222');
    } catch (err) {
      console.log(err);
    }
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Database running');
  } catch (error) {
    console.log(error);
  }
};
