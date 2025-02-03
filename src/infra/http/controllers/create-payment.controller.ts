import { MethodPayment } from '@/domain/payments/applications/enums/method-payment'
import { PaymentStatus } from '@/domain/payments/applications/enums/payment-status'
import { CreatePaymentUseCase } from '@/domain/payments/applications/use-cases/create-payment'
import { Body, Controller } from '@nestjs/common'
import { create } from 'node:domain'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createPaymentBodySchema = z.object({
  studentId: z.string().uuid(),
  price: z.coerce.number(),
  description: z.string(),
  methodPayment: z.enum([
    MethodPayment.CREDIT_CARD,
    MethodPayment.MONEY,
    MethodPayment.PIX,
  ]),
  paymentStatus: z.enum([PaymentStatus.PAID, PaymentStatus.PENDING]),
  dueDate: z.string(),
  paymentDate: z.string().optional(),
})

type CreatePaymentBodySchema = z.infer<typeof createPaymentBodySchema>

const zodValidationPipe = new ZodValidationPipe(createPaymentBodySchema)

@Controller('/payments')
export class CreatePaymentController {
  constructor(private createPayment: CreatePaymentUseCase) {}
  async handle(@Body(zodValidationPipe) body: CreatePaymentBodySchema) {
    const {
      description,
      dueDate,
      methodPayment,
      paymentStatus,
      price,
      studentId,
      paymentDate,
    } = body

    this.createPayment.execute({
      description,
      dueDate,
      methodPayment,
      paymentStatus,
      price,
      studentId,
      paymentDate,
    })
  }
}
