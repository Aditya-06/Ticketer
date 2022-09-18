import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

it('Has a route handler listening to /api/tickets for post requests', async () => {
  // Check if we are getting 404 or not
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('Can only be accessed if user has signed-in', async () => {
  const response = await request(app).post('/api/tickets').send({});

  // response should be 401 cause 401: invalid authentication
  expect(response.status).toEqual(401);
});

it('Status code should not be 401 if signed-in', async () => {
  // We sign-in using the dummy function and set a cookie
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  // response should not be 401 cause 401: invalid authentication
  expect(response.status).not.toEqual(401);
});

it('Error if invalid title is provided', async () => {
  // Empty title should be invalid
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: '', price: 10 })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ price: 10 })
    .expect(400);
});

it('Error if invalid price is provided', async () => {
  // price should not be negative, nor be empty
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'hello world', price: -10.0 })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'hello world' })
    .expect(400);
});

it('Ticket has valid inputs', async () => {
  // add in a check to make sure the ticket was saved
  let tickets = await Ticket.find({});

  // We are clearing the collection therefore should be 0 initially
  expect(tickets.length).toEqual(0);

  // Make a valid API request
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'sejg', price: 10 })
    .expect(201);

  // Now again count the number of tickets in the collection
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
