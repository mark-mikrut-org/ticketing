import { Message } from 'node-nats-streaming';
import mongoose from "mongoose";
import { TicketCreatedEvent } from "@my58tickets/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'concert ticket',
    price: 12,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, data, msg };
}

it('creates and saves a ticket', async() => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + msg object
  await listener.onMessage(data, msg);

  // make sure a ticket was created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg }  = await setup();

  await listener.onMessage(data, msg);

  // make sure ack message is called
  expect(msg.ack).toHaveBeenCalled();
});
