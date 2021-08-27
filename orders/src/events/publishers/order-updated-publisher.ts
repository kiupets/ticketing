import { Subjects, OrderUpdatedEvent, Publisher } from '@kiutickets/common'

export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated
}
