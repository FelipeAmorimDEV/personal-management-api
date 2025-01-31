import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, left, right } from '@/core/either'

import { MyProgressAnswer } from '../../enterprise/entities/my-progress-answer'
import { MyProgressAnswerRepository } from '../repositories/my-progress-answer-repository'
import { UsersAutorizationService } from '@/core/repositories/users-autorization-service'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { MyProgressRepository } from '../repositories/my-progress-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface CreateMyProgressAnswerUseCaseRequest {
  progressId: string
  userId: string
  reply: string
}

type CreateMyProgressAnswerUseCaseResponse = Either<
  NotAllowedError,
  { myProgressAnswer: MyProgressAnswer }
>

@Injectable()
export class CreateMyProgressAnswerUseCase {
  constructor(
    private myProgress: MyProgressRepository,
    private myProgressAnswer: MyProgressAnswerRepository,
    private userAuthorization: UsersAutorizationService,
  ) {}

  async execute({
    userId,
    reply,
    progressId,
  }: CreateMyProgressAnswerUseCaseRequest): Promise<CreateMyProgressAnswerUseCaseResponse> {
    const isAdmin = await this.userAuthorization.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }

    const myProgress = await this.myProgress.findById(progressId)

    if (!myProgress) {
      return left(new ResourceNotFoundError())
    }

    const myProgressAnswer = MyProgressAnswer.create({
      progressId: new UniqueEntityID(progressId),
      adminId: new UniqueEntityID(userId),
      reply,
    })

    await this.myProgressAnswer.create(myProgressAnswer)

    return right({ myProgressAnswer })
  }
}
