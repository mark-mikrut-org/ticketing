import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  // lecture 300
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log(`id = ${data.id}, title = ${data.title}, price = ${data.price}`);

    msg.ack();
  }
}