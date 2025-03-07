import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'

export class HttpStudentExercisePresenter {
  static toHTTP(exercise: StudentExercise) {
    return {
      id: exercise.id.toString(),
      sets: exercise.sets,
      repetitions: exercise.repetitions,
      restTime: exercise.restTime,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
      exerciseId: exercise.exerciseId.toString(),
      trainingId: exercise.trainingId.toString(),
    }
  }
}
