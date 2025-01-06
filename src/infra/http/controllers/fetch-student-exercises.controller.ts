import { FetchTrainingExercisesUseCase } from '@/domain/training/applications/use-cases/fetch-training-exercises'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { HttpStudentExercisePresenter } from '../presenters/http-student-exercise-presenter'

const fetchStudentExercisesQuerySchema = z.object({
  trainingId: z.string().uuid(),
})

type FetchStudentExercisesQuerySchema = z.infer<
  typeof fetchStudentExercisesQuerySchema
>

const zodValidationPipe = new ZodValidationPipe(
  fetchStudentExercisesQuerySchema,
)

@Controller('trainings/exercises')
export class FetchStudentExercisesController {
  constructor(private fetchTrainingExercises: FetchTrainingExercisesUseCase) {}
  @Get()
  async handle(
    @Query(zodValidationPipe) query: FetchStudentExercisesQuerySchema,
  ) {
    const result = await this.fetchTrainingExercises.execute({
      trainingId: query.trainingId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const exercises = result.value.exercises.map(
      HttpStudentExercisePresenter.toHTTP,
    )

    return { exercises }
  }
}
