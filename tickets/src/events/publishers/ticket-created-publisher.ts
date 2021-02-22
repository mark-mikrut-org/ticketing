import {Publisher, Subjects, TicketCreatedEvent} from "@my58tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
