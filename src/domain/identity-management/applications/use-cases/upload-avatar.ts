import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Student } from '../../enterprise/entities/student'
import { Injectable } from '@nestjs/common'

interface UploadAvatarUseCaseRequest {
  studentId: string
  fileName: string
}

type UploadAvatarUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: Student }
>

@Injectable()
export class UploadAvatarUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    fileName,
    studentId,
  }: UploadAvatarUseCaseRequest): Promise<UploadAvatarUseCaseResponse> {
    const user = await this.usersRepository.findById(studentId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.avatar = fileName

    await this.usersRepository.save(user)

    return right({ user })
  }
}
