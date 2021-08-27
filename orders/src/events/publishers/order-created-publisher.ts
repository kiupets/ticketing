import { Publisher, OrderCreatedEvent, Subjects } from '@kiutickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}
