import { Message } from 'node-nats-streaming';
import {Listener, OrderCreatedEvent, Subjects} from "@my58tickets/common";
import { QueueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = QueueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting milliseconds to process', delay);

    await expirationQueue.add({
      orderId: data.id
      },
        {
        delay
      }
    );

    msg.ack();
  }
}