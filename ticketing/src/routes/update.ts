import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from '@aaticketer/common';
import { Ticket } from '../models/tickets';

const router = Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is empty'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Find the ticket in the database
    const ticket = await Ticket.findById(req.params.id);

    // If no ticket by the given id, throw an error
    if (!ticket) {
      throw new NotFoundError();
    }

    // the ticket should be made by the same user
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // Now we actually apply the update
    ticket.set({ title: req.body.title, price: req.body.price });
    await ticket.save();
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
