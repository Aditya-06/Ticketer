import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

// Helper function to create a ticket
const createTicket = async () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'sejg', price: 10 });
};

it('Can fetch a list of tickets', async () => {
  // Make 3 tickets
  await createTicket();
  await createTicket();
  await createTicket();

  // Now, we expect 3 tickets in response
  const response = await request(app).get('/api/tickets').send().expect(200);

  // We expect to get the 3 tickets we created in return
  expect(response.body.length).toEqual(3);
});
