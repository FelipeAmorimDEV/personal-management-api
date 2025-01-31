import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ExerciseWithDetails } from '@/domain/training/enterprise/entities/value-objects/exercise-with-details'
import {
  StudentExercise as PrismaStudentExercise,
  Exercise as PrismaExercise,
} from '@prisma/client'

type ExerciseType = PrismaStudentExercise & {
  exercise: PrismaExercise
}

export class PrismaStudentExerciseWithDetailsMapper {
  static toDomain(exercise: ExerciseType) {
    return ExerciseWithDetails.create({
      studentExerciseId: new UniqueEntityID(exercise.id),
      exerciseId: new UniqueEntityID(exercise.exerciseId),
      trainingId: new UniqueEntityID(exercise.trainingId),
      name: exercise.exercise.name,
      description: exercise.exercise.description,
      videoUrl: exercise.exercise.videoUrl,
      sets: exercise.sets,
      restTime: exercise.restTime,
      repetitions: exercise.repetitions,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
    })
  }
}
