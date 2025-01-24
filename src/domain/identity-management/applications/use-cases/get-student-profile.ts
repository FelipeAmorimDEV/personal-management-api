import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Student } from '../../enterprise/entities/student'
import { Injectable } from '@nestjs/common'

interface GetStudentProfileUseCaseRequest {
  studentId: string
}

type GetStudentProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  { profile: Student }
>
@Injectable()
export class GetStudentProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    studentId,
  }: GetStudentProfileUseCaseRequest): Promise<GetStudentProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(studentId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ profile: user })
  }
}
