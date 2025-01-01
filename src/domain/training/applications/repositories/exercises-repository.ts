import { Exercise } from '../../enterprise/entities/exercise'

export abstract class ExercisesRepository {
  abstract findById(exerciseId: string): Promise<Exercise | null>
  abstract create(exercise: Exercise): Promise<void>
  abstract save(exercise: Exercise): Promise<void>
  abstract delete(exercise: Exercise): Promise<void>
}
