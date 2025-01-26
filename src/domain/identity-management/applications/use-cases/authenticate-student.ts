import { Either, left, right } from '@/core/either'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/users-repository'
import { CredentialsInvalidError } from './errors/credentials-invalid-error'
import { Encrypter } from '../cryptography/encrypter'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  CredentialsInvalidError,
  { access_token: string; user: Student }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new CredentialsInvalidError())
    }

    const isSamePassword = this.hashComparer.compare(password, user.password)

    if (!isSamePassword) {
      return left(new CredentialsInvalidError())
    }

    const acessToken = await this.encrypter.encrypt({ sub: user.id })

    return right({ access_token: acessToken, user })
  }
}
