import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const subject = 'ticket:created';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('publisher connected to nats');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 33,
    });
  } catch (err) {
    console.error(err);
  }
});
