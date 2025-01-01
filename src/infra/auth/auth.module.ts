import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from '@/infra/env'
import { JwtStrategy } from './jwt-strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('PRIVATE_KEY', { infer: true })
        const publicKey = config.get('PUBLIC_KEY', { infer: true })
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey,
          publicKey,
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
