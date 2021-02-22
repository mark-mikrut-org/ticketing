import { Subjects } from "./subjects";

// Lecture 295
// this ties together the subject and
// the expected message data fields
export interface TicketCreatedEvent {
  // this is a very particular enum (and a string!)
  subject: Subjects.TicketCreated;
  // and this is the shape of the data
  data: {
    id: string;
    title: string;
    price: number;
  };
}
