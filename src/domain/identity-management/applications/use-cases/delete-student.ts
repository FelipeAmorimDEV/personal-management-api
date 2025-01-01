import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteStudentUseCaseRequest {
  studentId: string
}

type DeleteStudentUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteStudentUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    studentId,
  }: DeleteStudentUseCaseRequest): Promise<DeleteStudentUseCaseResponse> {
    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    this.usersRepository.delete(student)

    return right(null)
  }
}
