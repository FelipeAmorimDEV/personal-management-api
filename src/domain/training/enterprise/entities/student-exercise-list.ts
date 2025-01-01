import { WatchedList } from '../../../../core/entities/watched-list'
import { StudentExercise } from './student-exercise'

export class StudentExerciseList extends WatchedList<StudentExercise> {
  compareItems(a: StudentExercise, b: StudentExercise): boolean {
    return a.id.equals(b.id)
  }
}
