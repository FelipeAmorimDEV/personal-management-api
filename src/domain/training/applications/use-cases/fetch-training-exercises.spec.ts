import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { FetchTrainingExercisesUseCase } from './fetch-training-exercises'
import { StudentExercise } from '../../enterprise/entities/student-exercise'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'
import { Exercise } from '../../enterprise/entities/exercise'

let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryExerciseRepository: InMemoryExercisesRepository
let sut: FetchTrainingExercisesUseCase
describe('Fetch Training Exercises', () => {
  beforeEach(() => {
    inMemoryExerciseRepository = new InMemoryExercisesRepository()
    inMemoryStudentExercisesRepository = new InMemoryStudentExercisesRepository(
      inMemoryExerciseRepository,
    )
    sut = new FetchTrainingExercisesUseCase(inMemoryStudentExercisesRepository)
  })

  it('should be able to fetch all student exercises', async () => {
    const exerciseCreated = Exercise.create({
      name: 'Supino Reto',
      videoUrl: 'http://youtube.com',
    })
    inMemoryExerciseRepository.create(exerciseCreated)

    const exercise = StudentExercise.create({
      exerciseId: exerciseCreated.id,
      sets: 3,
      repetitions: 12,
      restTime: 120,
      trainingId: new UniqueEntityID('training-1'),
    })
    inMemoryStudentExercisesRepository.create(exercise)

    const result = await sut.execute({
      trainingId: 'training-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.exercises).toHaveLength(1)
  })
})
