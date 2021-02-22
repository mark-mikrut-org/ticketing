import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: 'game',
    price: 5,
    userId: '123',
  });

  // save ticket to db
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make 2 separate changes (one to each of above)
  firstInstance!.set({ price:10 });
  secondInstance!.set({ price: 15 });

  // same first changed ticket -- success
  await firstInstance!.save();

  // try to save second changed ticket -- failure (OCC)
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('should not reach this point');
});

it('increments the version number on multiple saves', async() => {
  const ticket = Ticket.build({
    title: 'MMA event',
    price: 100,
    userId: '126',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
})
