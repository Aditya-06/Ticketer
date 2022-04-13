// use this mongo server instance as it speeds up dev and we can use multiple at a time
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

// run this function before all the tests
beforeAll(async () => {
  // start up mongo-memory-server
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// run this function before each test
beforeEach(async () => {
  // delete all the data inside the mongodb-memory-server instance we have created in the above func
  const collections = await mongoose.connection.db.collections();
  // drop all collections
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after all tests have run, run this function
afterAll(async () => {
  // disconnect from the database
  await mongo.stop();
  await mongoose.connection.close();
});
