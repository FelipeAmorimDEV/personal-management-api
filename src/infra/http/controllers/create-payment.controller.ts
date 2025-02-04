import { MethodPayment } from '@/domain/payments/applications/enums/method-payment'
import { PaymentStatus } from '@/domain/payments/applications/enums/payment-status'
import { CreatePaymentUseCase } from '@/domain/payments/applications/use-cases/create-payment'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

const createPaymentBodySchema = z.object({
  studentId: z.string().uuid(),
  price: z.coerce.number(),
  description: z.string(),
  methodPayment: z
    .enum([MethodPayment.CREDIT_CARD, MethodPayment.MONEY, MethodPayment.PIX])
    .optional(),
  paymentStatus: z.enum([PaymentStatus.PAID, PaymentStatus.PENDING]),
  dueDate: z.string(),
  paymentDate: z.string().optional(),
})

type CreatePaymentBodySchema = z.infer<typeof createPaymentBodySchema>

const zodValidationPipe = new ZodValidationPipe(createPaymentBodySchema)

@Controller('/invoices')
@UseGuards(JwtAuthGuard)
export class CreatePaymentController {
  constructor(private createPayment: CreatePaymentUseCase) {}
  @Post()
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

    await this.createPayment.execute({
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
