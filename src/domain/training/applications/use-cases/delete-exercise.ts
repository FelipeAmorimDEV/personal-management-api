import { Either, left, right } from '@/core/either'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteExerciseUseCaseRequest {
  userId: string
  exerciseId: string
}

type DeleteExerciseUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class DeleteExerciseUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private exercisesRepository: ExercisesRepository,
  ) {}

  async execute({
    userId,
    exerciseId,
  }: DeleteExerciseUseCaseRequest): Promise<DeleteExerciseUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }

    const exercise = await this.exercisesRepository.findById(exerciseId)

    if (!exercise) {
      return left(new ResourceNotFoundError())
    }

    await this.exercisesRepository.delete(exercise)

    return right(null)
  }
}
