import { Message } from 'node-nats-streaming';
import {Listener, OrderCreatedEvent, Subjects} from "@my58tickets/common";
import { QueueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = QueueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // find ticket the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket,throw err
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // mark ticket reserved by setting orderId
    ticket.set({ orderId: data.id });

    // save the ticket
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    // ack the ticket
    msg.ack();
  }
};