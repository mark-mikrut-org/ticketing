import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@my58tickets/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/tickets', requireAuth,
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be float > 0')
  ],
  validateRequest,
  async (req: Request, res:Response) => {

    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id
    });
    await ticket.save();

    // wait for event to be published to NATS
    // before responding to User with OK
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      // reference the ticket model because the values may have been
      // manipulated in mongoose hooks
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.status(201).send(ticket);
});

export { router as createTicketRouter };
