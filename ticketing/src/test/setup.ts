// use this mongo server instance as it speeds up dev and we can use multiple at a time
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app';

let mongo: any;

// declare a global function to allow cookies to be set in after sign in
declare global {
  var signin: () => string[];
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

global.signin = () => {
  // Build a Jsonwebtoken payload
  // {id, email}
  const payload = {
    // we can use a random id and email
    id: '32nrfu',
    email: 'aditya@gmail.com',
  };

  // Create a jsonwebtoken
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object
  // {jwt: MY_JWT}
  const session = { jwt: token };

  // turn session in JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode as BASE64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return string with encoded data
  return [`session=${base64}`];
};
