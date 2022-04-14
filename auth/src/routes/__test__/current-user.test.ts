import request from 'supertest';
import { app } from '../../app';

it('responds with details about the user', async () => {
  // Supertest does not manage cookies -> need a solution for that
  // therefore we have created a globa
  const cookie = await global.signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual('adi@gmail.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app).get('/api/users/currentuser').expect(200);

  expect(response.body.currentUser).toEqual(null);
});
