import { Either, left, right } from '@/core/either'
import { TrainingPlansRepository } from '../repositories/training-plans-repository'
import { Injectable } from '@nestjs/common'
import { TrainingsRepository } from '../repositories/trainings-repository'
import { Training } from '../../enterprise/entities/training'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface FetchTrainingRequest {
  trainingPlanId: string
}

type FetchTrainingResponse = Either<
  ResourceNotFoundError,
  { trainings: Training[] }
>

const daysOfWeek = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

@Injectable()
export class FetchTrainingUseCase {
  constructor(
    private trainingPlan: TrainingPlansRepository,
    private training: TrainingsRepository,
  ) {}

  async execute({
    trainingPlanId,
  }: FetchTrainingRequest): Promise<FetchTrainingResponse> {
    const trainingPlan = await this.trainingPlan.findById(trainingPlanId)

    if (!trainingPlan) {
      return left(new ResourceNotFoundError())
    }

    const trainings =
      await this.training.fetchManyByTrainingPlanIdWithGroupsMuscle(
        trainingPlanId,
      )

    if (trainingPlan.strategy === 'FLEXIBLE_SESSIONS') {
      return right({ trainings })
    }

    const today = new Date()
    const trainingFiltered = trainings.filter(
      (training) => training.dayOfWeek === daysOfWeek[today.getDay()],
    )

    return right({ trainings: trainingFiltered })
  }
}
