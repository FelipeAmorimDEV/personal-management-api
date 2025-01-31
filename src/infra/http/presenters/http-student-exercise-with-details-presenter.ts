import { ExerciseWithDetails } from '@/domain/training/enterprise/entities/value-objects/exercise-with-details'

export class HttpStudentExerciseWithDetailsPresenter {
  static toHTTP(exercise: ExerciseWithDetails) {
    return {
      id: exercise.studentExerciseId.toString(),
      exerciseId: exercise.exerciseId.toString(),
      trainingId: exercise.trainingId.toString(),
      name: exercise.name,
      videoUrl: exercise.videoUrl,
      description: exercise.description,
      sets: exercise.sets,
      repetitions: exercise.repetitions,
      restTime: exercise.restTime,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
    }
  }
}
