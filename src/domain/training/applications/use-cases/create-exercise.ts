import { Either, left, right } from '@/core/either'
import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'
import { GroupMuscle } from './create-training'

interface CreateExerciseUseCaseRequest {
  userId: string
  name: string
  videoUrl: string
  description?: string
  groupMuscle: GroupMuscle[]
}

type CreateExerciseUseCaseResponse = Either<NotAllowedError, null>

@Injectable()
export class CreateExerciseUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private exercisesRepository: ExercisesRepository,
  ) {}

  async execute({
    userId,
    name,
    videoUrl,
    description,
    groupMuscle,
  }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }

    const exercise = Exercise.create({
      name,
      videoUrl,
      description,
      groupMuscle,
    })

    await this.exercisesRepository.create(exercise)

    return right(null)
  }
}
