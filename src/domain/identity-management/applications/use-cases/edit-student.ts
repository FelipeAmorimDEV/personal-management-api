import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { AppError } from '@/core/errors/not-allowed-error copy'
import { compare, hash } from 'bcryptjs'
import { Injectable } from '@nestjs/common'

interface EditStudentUseCaseRequest {
  studentId: string
  name: string
  password?: string
  old_password?: string
}

type EditStudentUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class EditStudentUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    studentId,
    name,
    password,
    old_password,
  }: EditStudentUseCaseRequest): Promise<EditStudentUseCaseResponse> {
    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    student.name = name

    if (!password && old_password) {
      return left(new AppError('O novo password não foi informado'))
    }

    if (password && !old_password) {
      return left(new AppError('O password antigo não informado'))
    }

    if (password && old_password) {
      const isSamePassword = await compare(old_password, student.password)

      if (!isSamePassword) {
        return left(new AppError('O password antigo não confere'))
      }

      student.password = await hash(password, 8)
    }

    this.usersRepository.save(student)

    return right(null)
  }
}
