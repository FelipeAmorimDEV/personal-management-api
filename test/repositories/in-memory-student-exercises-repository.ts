import { StudentExercisesRepository } from '@/domain/training/applications/repositories/student-exercises-repository'
import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'
import { InMemoryExercisesRepository } from './in-memory-exercises-repository'
import { ExerciseWithDetails } from '@/domain/training/enterprise/entities/value-objects/exercise-with-details'

export class InMemoryStudentExercisesRepository
  implements StudentExercisesRepository
{
  constructor(private ExercisesRepository: InMemoryExercisesRepository) {}
  public items: StudentExercise[] = []

  async fetchManyByTrainingId(trainingId: string) {
    const exercises = this.items
      .filter((item) => item.trainingId.toString() === trainingId)
      .map((item) => {
        const exercise = this.ExercisesRepository.items.find(
          (exercise) => exercise.id === item.exerciseId,
        )

        if (!exercise) {
          throw new Error('Exercise not exists')
        }

        return ExerciseWithDetails.create({
          exerciseId: item.exerciseId,
          trainingId: item.trainingId,
          studentExerciseId: item.id,
          sets: item.sets,
          repetitions: item.repetitions,
          restTime: item.restTime,
          name: exercise.name,
          videoUrl: exercise.videoUrl,
          description: exercise.description,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })
      })

    return exercises
  }

  async create(exercise: StudentExercise) {
    this.items.push(exercise)
  }
}
