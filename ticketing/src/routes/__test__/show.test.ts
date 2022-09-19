import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Returns a 404 if the ticket is not found', async () => {
  // Need to have a valid mongodb id else it will throw an error
  // We create our own valid id
  const id = new mongoose.Types.ObjectId().toHexString();
  // Check if we are getting 404 or not
  await request(app)
    .get(`/api/tickets/${id}`)
    .send({})
    .expect(404);
});

it('Returns the ticket if it is found', async () => {
  // dummy ticket variables
  const title = 'aienf';
  const price = 320;

  // first, we create a ticket
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
