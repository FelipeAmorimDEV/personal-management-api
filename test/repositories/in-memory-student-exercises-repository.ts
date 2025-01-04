import { StudentExercisesRepository } from '@/domain/training/applications/repositories/student-exercises-repository'
import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'

export class InMemoryStudentExercisesRepository implements StudentExercisesRepository {
  public items: StudentExercise[] = []

  async fetchManyByTrainingId(trainingId: string) {
    const exercises = this.items.filter((item) => item.trainingId.toString() === trainingId)
    return exercises
  }


  async create(exercise: StudentExercise) {
    this.items.push(exercise)
  }

}
