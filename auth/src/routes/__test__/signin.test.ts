import request from 'supertest';
import { app } from '../../app';

it('fails when an email does not exist try to signin', async () => {
  await request(app)
    .post('/api/users/signIn')
    .send({
      email: 'adi@gmail.com',
      password: '123#pass',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  // sign up an email address
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'adi@gmail.com',
      password: '123#pass',
    })
    .expect(201);

  // attempt to sign in using the wrong password
  await request(app)
    .post('/api/users/signIn')
    .send({
      email: 'adi@gmail.com',
      password: '123pass',
    })
    .expect(400);
});

it('responds with a cookie when valid credentials are provided', async () => {
  // sign up an email address
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'adi@gmail.com',
      password: '123#pass',
    })
    .expect(201);

  // attempt to sign in using the correct pass
  const response = await request(app)
    .post('/api/users/signIn')
    .send({
      email: 'adi@gmail.com',
      password: '123#pass',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
