import request from 'supertest';
import { app } from '../../app';

it('clear the cookie after signin out', async () => {
  // first, create an account to set cookie
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'adi@gmail.com',
      password: '124@pass',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
