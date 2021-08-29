// import express, { Request, Response } from 'express'
// import { body } from 'express-validator'
// import {
//   requireAuth,
//   validateRequest,
//   BadRequestError,
//   NotAuthorizedError,
//   NotFoundError,
//   OrderStatus
// } from '@kiutickets/common'
// import { Order } from '../models/order'
// import mercadopago from 'mercadopago'
// import { Payment } from '../models/payment'
// import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'
// import { natsWrapper } from '../nats-wrapper'

// mercadopago.configure({
//   access_token: process.env.MERCADO_KEY!
// })

// const router = express.Router()

// router.post(
//   '/api/payments/mercado',
//   requireAuth,
//   [
//     body('title')
//       .not()
//       .isEmpty()
//   ],
//   validateRequest,
//   requireAuth,
//   async (req: Request, res: Response) => {
//     const { title, price } = req.body
//     console.log(title)
//     let preference = {
//       items: [
//         {
//           title,
//           unit_price: price,
//           quantity: 1
//         }
//       ]
//     }
//     const charge = await mercadopago.preferences.create(preference)
//     res.send(charge)
//   }
// )

// export { router as mercadoRouter }
