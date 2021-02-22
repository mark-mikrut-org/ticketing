import mongoose from "mongoose";
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {

  // Create a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'movie',
    price: 10
  });
  await ticket.save();

  // user for building and retrieving order
  const user = global.signin();  // really a cookie

  // make a request to build an order with ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // fetch the order as same user
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'movie',
    price: 10
  });
  await ticket.save();

  const user = global.signin();
  const user2 = global.signin();
  // make a request to build an order with ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // fetch the order as same user
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user2)
    .send()
    .expect(401);

});
