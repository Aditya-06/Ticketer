import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Returns a 404 if the provided id is not found', async () => {
  // generate an ID that fits mongodbs criteria
  const id = new mongoose.Types.ObjectId().toHexString();
  // ensure we get a 404 if random id is given
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sefnw',
      price: 39,
    })
    .expect(404);
});

it('Returns a 401 if user is not authenticated', async () => {
  // Just want to check if authentication works or not so cookie is removed
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'sefnw',
      price: 34.0,
    })
    .expect(401);
});

it('Returns a 401 if user does not own the ticket', async () => {
  // Create a ticket using a signed-in user
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'sejg', price: 10.0 })
    .expect(201);

  // Now, we call global.signin() again because it will create a new id
  // the new id does not own the ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sefnsvkjw',
      price: 3.0,
    })
    .expect(401);
});

it('Returns a 400 if user enters invalid ticket name or price', async () => {
  // Now, we want the user to have ownership of the cookie
  // therefore, we will store the cookie in another variable
  const cookie = global.signin();
  // Create a ticket using a signed-in user
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'sejg', price: 10.0 })
    .expect(201);

  // Now, generate a bad request but using the same cookie
  // invalid ticket name
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 3.0,
    })
    .expect(400);

  // invalid price
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'sefkjb',
      price: -19,
    })
    .expect(400);
});

it('Updates the ticket if the correct input is provided', async () => {
  // we want the user to have ownership of the cookie
  // therefore, we will store the cookie in another variable
  const cookie = global.signin();
  // Create a ticket using a signed-in user
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'sejg', price: 10.0 })
    .expect(201);

  // Now, generate a valid request but using the same cookie
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'hello',
      price: 3.0,
    })
    .expect(200);

  // now make the sure the update actually went through
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  // check if the values are the same as the ones set in the last update
  expect(ticketResponse.body.title).toEqual('hello');
  expect(ticketResponse.body.price).toEqual(3);
});
