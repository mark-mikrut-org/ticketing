import { Message } from 'node-nats-streaming';
import {Listener, OrderCreatedEvent, Subjects} from '@my58tickets/common';
import { QueueGroupName } from "./queueGroupName";
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = QueueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version
    });

    await order.save();

    msg.ack();
  }
}