import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  // send a body and expect a 201 response code
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'adityaajmera@gmail.com',
      password: '123@pass',
    })
    .expect(201);
});

it('returns a 400 on invalid email', async () => {
  // send a body and expect a 400 response code
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'adityaajmewejnmail.com',
      password: '123@pass',
    })
    .expect(400);
});

it('returns a 400 on invalid password', async () => {
  // send a body and expect a 400 response code
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'adityaajme@gmail.com',
      password: '123@',
    })
    .expect(400);
});

it('returns a 400 on incomplete request body', async () => {
  // send an incomplete body and expect 400 response
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('returns 400 on duplicate email', async () => {
  // sign up via an email -> should get 201
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'adityaajmera@gmail.com',
      password: '123@pass',
    })
    .expect(201);

  // try using the same email -> should get 400
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'adityaajmera@gmail.com',
      password: '123@pass',
    })
    .expect(400);
});
