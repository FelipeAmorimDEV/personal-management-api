import { Controller, Get, Redirect } from '@nestjs/common'

@Controller('payment')
export class PaymentStatusController {
  @Get('success')
  @Redirect()
  async successRedirect() {
    const successDeepLink = `seuapp://success`
    return { url: successDeepLink } // Redireciona para o deep link
  }

  @Get('cancel')
  @Redirect()
  async cancelRedirect() {
    const cancelDeepLink = `seuapp://cancel`
    return { url: cancelDeepLink } // Redireciona para o deep link
  }
}
