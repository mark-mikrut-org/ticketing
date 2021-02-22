import { Publisher, Subjects, TicketUpdatedEvent } from '@my58tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject =  Subjects.TicketUpdated;
}