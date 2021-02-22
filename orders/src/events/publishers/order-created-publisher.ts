import { Publisher, Subjects, OrderCreatedEvent } from "@my58tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
