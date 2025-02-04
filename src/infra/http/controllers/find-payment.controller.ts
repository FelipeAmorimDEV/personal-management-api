import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { FindPaymentUseCase } from '@/domain/payments/applications/use-cases/find-payment'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common'
import { HttpPaymentsDetailsPresenter } from '../presenters/http-payments-presenter-details'

@Controller('payments/:id')
@UseGuards(JwtAuthGuard)
export class FindPaymentController {
  constructor(private readonly findPaymentUseCase: FindPaymentUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.findPaymentUseCase.execute({ paymentId: id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      payment: HttpPaymentsDetailsPresenter.toHTTP(result.value.payment),
    }
  }
}
