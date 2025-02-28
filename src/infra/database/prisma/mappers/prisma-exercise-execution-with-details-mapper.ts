import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { StudentExerciseExecutionWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/student-exercise-execution-with-details'
import {
  Exercise,
  ExerciseExecution as PrismaExeciseExecutions,
  GroupMuscle,
} from '@prisma/client'

export type PrismaExerciseRelation = Exercise & {
  groupMuscle: GroupMuscle[]
}

export type PrismaExeciseExecution = PrismaExeciseExecutions & {
  exercise?: PrismaExerciseRelation
}

export class PrismaExerciseExecutionMapperWithDetails {
  static toDomain(exerciseExecution: PrismaExeciseExecution) {
    return StudentExerciseExecutionWithDetails.create({
      exerciseId: new UniqueEntityID(exerciseExecution.exerciseId),
      feedbackId: new UniqueEntityID(exerciseExecution.feedbackId),
      studentId: new UniqueEntityID(exerciseExecution.studentId),
      studentExerciseId: new UniqueEntityID(exerciseExecution.id),
      weightUsed: exerciseExecution.weightUsed,
      createdAt: exerciseExecution.createdAt,
      groupMuscle: exerciseExecution.exercise?.groupMuscle,
      name: exerciseExecution.exercise?.name,
    })
  }
}
