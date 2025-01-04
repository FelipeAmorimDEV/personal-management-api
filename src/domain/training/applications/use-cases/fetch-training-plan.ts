import { Either, right } from '@/core/either'
import { TrainingPlan } from '../../enterprise/entities/training-plan'
import { TrainingPlansRepository } from '../repositories/training-plans-repository'
import { Injectable } from '@nestjs/common'

interface FetchTrainingPlanRequest {
  studentId: string
}

type FetchTrainingPlanResponse = Either<null, { trainingPlans: TrainingPlan[] }>

@Injectable()
export class FetchTrainingPlanUseCase {
  constructor(private trainingPlan: TrainingPlansRepository) {}

  async execute({
    studentId,
  }: FetchTrainingPlanRequest): Promise<FetchTrainingPlanResponse> {
    const trainingPlans =
      await this.trainingPlan.fetchManyByStudentId(studentId)

    return right({ trainingPlans })
  }
}
