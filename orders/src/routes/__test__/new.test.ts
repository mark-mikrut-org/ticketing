import mongoose from "mongoose";
import request from 'supertest';
import {app} from '../../app';
import {Order, OrderStatus} from '../../models/order';
import {Ticket} from '../../models/ticket';
import { natsWrapper } from "../../nats-wrapper"; // it is mocked

it('returns an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId(); // random object id

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId})
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: 'lasdfasdf',
    status: OrderStatus.Created,
    expiresAt: new Date()
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'hard rock concert',
    price: 19
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(201); // success!
});

it('emits an order created event', async() => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'hard rock concert',
    price: 19
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(201); // success!

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
