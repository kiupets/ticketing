import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus
} from '@kiutickets/common'
import { Order } from '../models/order'
import mercadopago from 'mercadopago'
import { Payment } from '../models/payment'
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

mercadopago.configure({
  access_token:
    'APP_USR-8218825195711113-081920-d908bb0d9a938f1595b11a266856bbf2-810539318'
})

router.post(
  '/api/payments',
  requireAuth,
  [
    body('orderId')
      .not()
      .isEmpty()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, title, price } = req.body
    console.log(req.currentUser)

    const order = await Order.findById(orderId)

    if (!order) {
      throw new NotFoundError()
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order')
    }
    let preference = {
      items: [
        {
          title,
          unit_price: price,
          quantity: 1
        }
      ]
    }
    const charge = await mercadopago.preferences.create(preference)
    const payment = Payment.build({
      orderId,
      mercadoId: charge.body.id
    })
    await payment.save()

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      mercadoId: payment.mercadoId
    })
    res.send(payment)
  }
)

export { router as createChargeRouter }
