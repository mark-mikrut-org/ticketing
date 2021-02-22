import mongoose from "mongoose";
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from "@my58tickets/common";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert ticket',
    price: 23,
  });
  await ticket.save();

  // create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'big concert ticket',
    price: 25,
    userId: '123'
  };

  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, ticket };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const ticket = await Ticket.findById(data.id);

  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
  expect(ticket!.version).toEqual(data.version);

});

it('acks the msg', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack on an event with an out of sequence version', async () => {
  const { msg, data, listener, ticket } = await setup();

  data.version = data.version + 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {

  }
  expect(msg.ack).not.toHaveBeenCalled();
});
