import { InMemoryExerciseExecutionsRepository } from 'test/repositories/in-memory-exercise-executions-repository'
import { makeExerciseExecution } from 'test/factories/make-exercise-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchExerciseExecutionByUserUseCase } from './fetch-exercise-execution-by-user'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'
import { Exercise } from '@/domain/training/enterprise/entities/exercise'

let inMemoryExerciseExecutionsRepository: InMemoryExerciseExecutionsRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: FetchExerciseExecutionByUserUseCase

describe('Fetch Exercise Executions By User', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    inMemoryExerciseExecutionsRepository =
      new InMemoryExerciseExecutionsRepository(inMemoryExercisesRepository)
    sut = new FetchExerciseExecutionByUserUseCase(
      inMemoryExerciseExecutionsRepository,
    )
  })

  it('should be able do fetch recent exercise executions by user', async () => {
    const exercise = Exercise.create({
      name: 'Supino Reto',
      videoUrl: 'video.jpg',
      description: 'Description',
    })
    inMemoryExercisesRepository.create(exercise)

    const exerciseExecution = makeExerciseExecution({
      studentId: new UniqueEntityID('student-1'),
      exerciseId: exercise.id,
    })
    inMemoryExerciseExecutionsRepository.create(exerciseExecution)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.exerciseExecutions).toHaveLength(1)
  })
})
