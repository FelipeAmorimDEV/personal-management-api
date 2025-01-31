import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { UsersAutorizationService } from '../../../../core/repositories/users-autorization-service'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface EditExerciseUseCaseRequest {
  userId: string
  exerciseId: string
  name?: string
  videoUrl?: string
  description?: string
}

type EditExerciseUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { exercise: Exercise }
>

@Injectable()
export class EditExerciseUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private exercisesRepository: ExercisesRepository,
  ) {}

  async execute({
    userId,
    exerciseId,
    name,
    videoUrl,
    description,
  }: EditExerciseUseCaseRequest): Promise<EditExerciseUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }

    const exercise = await this.exercisesRepository.findById(exerciseId)

    if (!exercise) {
      return left(new ResourceNotFoundError())
    }

    exercise.name = name ?? exercise.name
    exercise.videoUrl = videoUrl ?? exercise.videoUrl
    exercise.description = description ?? exercise.description

    await this.exercisesRepository.save(exercise)

    return right({ exercise })
  }
}
