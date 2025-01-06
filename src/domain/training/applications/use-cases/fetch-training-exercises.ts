import { Injectable } from '@nestjs/common'
import { StudentExercise } from '../../enterprise/entities/student-exercise'
import { StudentExercisesRepository } from '../repositories/student-exercises-repository'
import { Either, right } from '@/core/either'

interface FetchTrainingExercisesRequest {
  trainingId: string
}

type FetchTrainingExercisesResponse = Either<
  null,
  { exercises: StudentExercise[] }
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
