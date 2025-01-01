import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface EditStudentUseCaseRequest {
  studentId: string
  name: string
}

type EditStudentUseCaseResponse = Either<ResourceNotFoundError, null>

export class EditStudentUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    studentId,
    name,
  }: EditStudentUseCaseRequest): Promise<EditStudentUseCaseResponse> {
    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    student.name = name

    this.usersRepository.save(student)

    return right(null)
  }
}
