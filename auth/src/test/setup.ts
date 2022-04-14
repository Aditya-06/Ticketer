// use this mongo server instance as it speeds up dev and we can use multiple at a time
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

let mongo: any;

// declare a global function to allow cookies to be set in after sign in
declare global {
  var signup: () => Promise<string[]>;
}

// run this function before all the tests
beforeAll(async () => {
  // since secret is configured in pod, need to deifne key
  process.env.JWT_KEY = 'asdfg';
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

global.signup = async () => {
  const email = 'adi@gmail.com';
  const password = '123#pass';

  // Sign in using an email to get a cookie
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  // set the cookir received
  const cookie = response.get('Set-Cookie');
  return cookie;
};
