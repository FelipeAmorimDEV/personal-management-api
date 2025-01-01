import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { StudentExercise } from '../../enterprise/entities/student-exercise'
import { StudentExerciseList } from '../../enterprise/entities/student-exercise-list'
import { DayOfWeek, Training } from '../../enterprise/entities/training'
import { TrainingsRepository } from '../repositories/trainings-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'
import { Either, left, right } from '@/core/either'

type Exercise = {
  exerciseId: string
  sets: number
  repetitions: number
  restTime: number
}

interface CreateTrainingUseCaseRequest {
  userId: string
  name: string
  type: 'DAY' | 'SESSION'
  exercises: Exercise[]
  trainingPlanId: string
  dayOfWeek?: DayOfWeek
}

type CreateTrainingUseCaseResponse = Either<NotAllowedError, null>

export class CreateTrainingUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private trainingsRepository: TrainingsRepository,
  ) {}

  async execute({
    userId,
    name,
    type,
    dayOfWeek,
    exercises,
    trainingPlanId,
  }: CreateTrainingUseCaseRequest): Promise<CreateTrainingUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }

    const training = Training.create({
      name,
      type,
      dayOfWeek,
      trainingPlanId: new UniqueEntityID(trainingPlanId),
    })

    const studentExercises = exercises.map((exercise) =>
      StudentExercise.create({
        exerciseId: new UniqueEntityID(exercise.exerciseId),
        trainingId: training.id,
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        restTime: exercise.restTime,
      }),
    )

    const studentExercisesList = new StudentExerciseList(studentExercises)

    training.exercises = studentExercisesList

    await this.trainingsRepository.create(training)

    return right(null)
  }
}
