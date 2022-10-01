import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@aaticketer/common';
import { Ticket } from '../models/tickets';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';

const router = Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is empty'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    // publish the fact the ticket has been created
    new TicketCreatedPublisher(client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
    });
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
