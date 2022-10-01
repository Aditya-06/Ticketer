import { Publisher, Subjects, TicketCreatedEvent } from '@aaticketer/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // make sure this variable is not altered
    readonly subject = Subjects.TicketCreated;
    
}