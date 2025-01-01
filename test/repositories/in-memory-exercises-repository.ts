import { ExercisesRepository } from '@/domain/training/applications/repositories/exercises-repository'
import { Exercise } from '@/domain/training/enterprise/entities/exercise'

export class InMemoryExercisesRepository implements ExercisesRepository {
  public items: Exercise[] = []

  async findById(exerciseId: string) {
    const exercise = this.items.find(
      (item) => item.id.toString() === exerciseId,
    )

    if (!exercise) {
      return null
    }

    return exercise
  }

  async create(exercise: Exercise) {
    this.items.push(exercise)
  }

  async save(exercise: Exercise) {
    const itemIndex = this.items.findIndex((item) => item.id === exercise.id)
    this.items[itemIndex] = exercise
  }

  async delete(exercise: Exercise) {
    const itemIndex = this.items.findIndex((item) => item.id === exercise.id)
    this.items.splice(itemIndex, 1)
  }
}
