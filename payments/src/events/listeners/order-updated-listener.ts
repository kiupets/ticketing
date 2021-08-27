import {
  Subjects,
  Listener,
  OrderUpdatedEvent,
  NotFoundError
} from '@kiutickets/common'
import { Message } from 'node-nats-streaming'

import { queueGroupName } from './queue-group-name'
import { Order } from '../../models/order'
export class OrderUpdatedListener extends Listener<OrderUpdatedEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated
  queueGroupName = queueGroupName
  async onMessage (data: OrderUpdatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.id)
    if (!order) {
      throw new Error('Order not Found from orderUpdatedLister')
    }
    await order.save()

    msg.ack()
  }
}
