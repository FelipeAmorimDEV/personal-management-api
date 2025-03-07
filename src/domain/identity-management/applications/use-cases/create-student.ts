import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from '@/core/either'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { StripeServiceRepository } from '@/domain/payments/applications/repositories/stripe-service-repository'

interface CreateStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateStudentUseCaseResponse = Either<EmailAlreadyExistsError, null>

@Injectable()
export class CreateStudentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private stripeService: StripeServiceRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateStudentUseCaseRequest): Promise<CreateStudentUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new EmailAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(student)
    await this.stripeService.findOrCreateCustomer(student.email)

    return right(null)
  }
}
