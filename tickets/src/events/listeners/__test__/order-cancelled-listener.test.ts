import { Message } from 'node-nats-streaming';
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderStatus } from "@my58tickets/common";
import {OrderCancelledListener } from "../order-cancelled-listener";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";


const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'Concert',
    price: 25,
    userId: 'asdasdf',
  });

  ticket.set({ orderId });

  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    }
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, ticket, data, msg, orderId };
};

it('updates ticket, publishes an event, acks the msg', async () => {
  const { msg, data, ticket, orderId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();

  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
})