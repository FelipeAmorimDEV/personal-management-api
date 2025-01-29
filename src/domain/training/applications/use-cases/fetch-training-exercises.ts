import { Injectable } from '@nestjs/common'
import { StudentExercisesRepository } from '../repositories/student-exercises-repository'
import { Either, right } from '@/core/either'
import { ExerciseWithDetails } from '../../enterprise/entities/value-objects/exercise-with-details'

interface FetchTrainingExercisesRequest {
  trainingId: string
}

type FetchTrainingExercisesResponse = Either<
  null,
  { exercises: ExerciseWithDetails[] }
>

@Injectable()
export class FetchTrainingExercisesUseCase {
  constructor(private studentExercise: StudentExercisesRepository) {}
  async execute({
    trainingId,
  }: FetchTrainingExercisesRequest): Promise<FetchTrainingExercisesResponse> {
    const exercises =
      await this.studentExercise.fetchManyByTrainingId(trainingId)

    return right({ exercises })
  }
}
