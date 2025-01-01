import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from '@/infra/env'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z
    .union([z.string().uuid(), z.object({ value: z.string().uuid() })])
    .transform((sub) => {
      return typeof sub === 'object' ? sub.value : sub
    }),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: publicKey,
      algorithms: ['RS256'],
    })
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return tokenPayloadSchema.parse(payload)
  }
}
