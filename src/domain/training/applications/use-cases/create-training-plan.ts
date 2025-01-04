import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingPlan } from '../../enterprise/entities/training-plan'
import { TrainingPlansRepository } from '../repositories/training-plans-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface CreateTrainingPlanUseCaseRequest {
  userId: string
  studentId: string
  name: string
  goal: string
  sessionsPerWeek: number
  strategy: 'FIXED_DAYS' | 'FLEXIBLE_SESSIONS'
  startDate: string
  endDate: string
}

type CreateTrainingPlanUseCaseResponse = Either<NotAllowedError, null>

@Injectable()
export class CreateTrainingPlanUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private trainingPlansRepository: TrainingPlansRepository,
  ) {}

  async execute({
    userId,
    studentId,
    name,
    goal,
    sessionsPerWeek,
    strategy,
    startDate,
    endDate,
  }: CreateTrainingPlanUseCaseRequest): Promise<CreateTrainingPlanUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }

    const trainingPlan = TrainingPlan.create({
      studentId: new UniqueEntityID(studentId),
      name,
      goal,
      sessionsPerWeek,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      strategy,
    })

    await this.trainingPlansRepository.create(trainingPlan)

    return right(null)
  }
}
