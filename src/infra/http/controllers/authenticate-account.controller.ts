import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthenticateStudentUseCase } from '@/domain/identity-management/applications/use-cases/authenticate-student'
import { CredentialsInvalidError } from '@/domain/identity-management/applications/use-cases/errors/credentials-invalid-error'

const authenticateAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateAccountBodySchema = z.infer<
  typeof authenticateAccountBodySchema
>

@Controller('sessions')
export class AuthenticateAccountController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateAccountBodySchema))
  async handle(@Body() body: AuthenticateAccountBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case CredentialsInvalidError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { access_token } = result.value

    return { access_token }
  }
}
