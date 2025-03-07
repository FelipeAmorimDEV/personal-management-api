import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'
import {
  Prisma,
  StudentExercise as PrismaStudentExercise,
} from '@prisma/client'

export class PrismaStudentExerciseMapper {
  static toDomain(exercise: PrismaStudentExercise) {
    return StudentExercise.create(
      {
        exerciseId: new UniqueEntityID(exercise.exerciseId),
        trainingId: new UniqueEntityID(exercise.trainingId),
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        restTime: exercise.restTime,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
      },
      new UniqueEntityID(exercise.id),
    )
  }

  static toPrisma(
    exercise: StudentExercise,
  ): Prisma.StudentExerciseUncheckedCreateInput {
    return {
      id: exercise.id.toString(),
      trainingId: exercise.trainingId.toString(),
      exerciseId: exercise.exerciseId.toString(),
      repetitions: exercise.repetitions,
      sets: exercise.sets,
      restTime: exercise.restTime,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
    }
  }
}
