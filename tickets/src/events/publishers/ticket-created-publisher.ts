import { Publisher, Subjects, TicketCreatedEvent } from '@kiutickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}
