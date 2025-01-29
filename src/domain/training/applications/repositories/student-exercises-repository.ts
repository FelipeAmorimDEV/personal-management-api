import { StudentExercise } from '../../enterprise/entities/student-exercise'
import { ExerciseWithDetails } from '../../enterprise/entities/value-objects/exercise-with-details'

export abstract class StudentExercisesRepository {
  abstract fetchManyByTrainingId(
    trainingId: string,
  ): Promise<ExerciseWithDetails[]>

  abstract create(StudentExercise: StudentExercise): Promise<void>
}
