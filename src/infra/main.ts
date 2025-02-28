import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  app.use(
    '/webhook/stripe',
    express.raw({ type: 'application/json' }), // 🚀 Garante que o Stripe receba o body sem modificação
  )

  await app.listen(port)
}
bootstrap()
