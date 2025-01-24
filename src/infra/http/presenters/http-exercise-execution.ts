import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'

export class HttpExerciseExecutionPresenter {
  static toHTTP(exerciseExecution: StudentExerciseExecution) {
    return {
      id: exerciseExecution.id.toString(),
      exerciseId: exerciseExecution.exerciseId.toString(),
      feedbackId: exerciseExecution.feedbackId.toString(),
      studentId: exerciseExecution.studentId.toString(),
      exerciseName: exerciseExecution.exercise?.name,
      groupsMuscle: exerciseExecution.exercise?.groupMuscle,
      weightUsed: exerciseExecution.weightUsed,
      createdAt: exerciseExecution.createdAt,
    }
  }
}
