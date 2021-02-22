import { Message } from 'node-nats-streaming';
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@my58tickets/common";
import {OrderCreatedListener } from "../order-created-listener";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    title: 'Concert',
    price: 101,
    userId: 'asdfs',
  });
  await ticket.save();

  // create a fake data object
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'sdfasdf',
    expiresAt: 'sdfasdf',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, ticket, data, msg };
}

it('sets the order id of the ticket', async () => {
  const { listener, ticket, data, msg} = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});


it ('acks the message', async () => {
  const { listener, data, msg} = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();

});

it('publishes a ticket-updated event', async () => {
  const { listener, ticket, data, msg} = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
  expect(ticketUpdatedData.orderId).toEqual(data.id);
  expect(ticketUpdatedData.id).toEqual(data.ticket.id);
});