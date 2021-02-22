import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdksdf',
      price: 20
    });

};

it('can fetch a list of tickets', async () => {
  const title = 'asdflsdf';
  const price = 20;
  await createTicket(title, price);
  await createTicket(title, price);
  await createTicket(title, price);

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
