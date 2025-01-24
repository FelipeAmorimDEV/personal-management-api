import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'
import {
  Exercise,
  GroupMuscle,
  Prisma,
  ExerciseExecution as PrismaExeciseExecutions,
} from '@prisma/client'

export type PrismaExerciseRelation = Exercise & {
  groupMuscle: GroupMuscle[]
}

type PrismaExeciseExecution = PrismaExeciseExecutions & {
  exercise?: PrismaExerciseRelation
}

export class PrismaExerciseExecutionMapper {
  static toDomain(exerciseExecution: PrismaExeciseExecution) {
    return StudentExerciseExecution.create(
      {
        exerciseId: new UniqueEntityID(exerciseExecution.exerciseId),
        feedbackId: new UniqueEntityID(exerciseExecution.feedbackId),
        studentId: new UniqueEntityID(exerciseExecution.studentId),
        weightUsed: exerciseExecution.weightUsed,
        createdAt: exerciseExecution.createdAt,
        exercise: exerciseExecution.exercise,
      },
      new UniqueEntityID(exerciseExecution.id),
    )
  }

  static toPrisma(
    exerciseExecution: StudentExerciseExecution,
  ): Prisma.ExerciseExecutionUncheckedCreateInput {
    return {
      id: exerciseExecution.id.toString(),
      exerciseId: exerciseExecution.exerciseId.toString(),
      feedbackId: exerciseExecution.feedbackId.toString(),
      studentId: exerciseExecution.studentId.toString(),
      weightUsed: exerciseExecution.weightUsed,
      createdAt: exerciseExecution.createdAt,
    }
  }
}
