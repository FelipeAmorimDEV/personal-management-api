import { StudentExerciseExecutionWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/student-exercise-execution-with-details'

export class HttpExerciseExecutionWithDetailsPresenter {
  static toHTTP(exerciseExecution: StudentExerciseExecutionWithDetails) {
    return {
      id: exerciseExecution.studentExerciseId.toString(),
      exerciseId: exerciseExecution.exerciseId.toString(),
      feedbackId: exerciseExecution.feedbackId.toString(),
      studentId: exerciseExecution.studentId.toString(),
      weightUsed: exerciseExecution.weightUsed,
      createdAt: exerciseExecution.createdAt,
      name: exerciseExecution.name,
      groupMuscle: exerciseExecution.groupMuscle,
    }
  }
}
