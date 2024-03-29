import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@aaticketer/common';
import { Ticket } from '../models/tickets';

const router = Router();

router.get(
  '/api/tickets',

  async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});
    res.send(tickets);
  }
);

export { router as indexTicketRouter };
