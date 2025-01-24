import { InMemoryExerciseExecutionsRepository } from 'test/repositories/in-memory-exercise-executions-repository'
import { makeExerciseExecution } from 'test/factories/make-exercise-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchExerciseExecutionByUserUseCase } from './fetch-exercise-execution-by-user'

let inMemoryExerciseExecutionsRepository: InMemoryExerciseExecutionsRepository
let sut: FetchExerciseExecutionByUserUseCase

describe('Fetch Exercise Executions By User', () => {
  beforeEach(() => {
    inMemoryExerciseExecutionsRepository =
      new InMemoryExerciseExecutionsRepository()
    sut = new FetchExerciseExecutionByUserUseCase(
      inMemoryExerciseExecutionsRepository,
    )
  })

  it('should be able do fetch recent exercise executions by user', async () => {
    const exerciseExecution = makeExerciseExecution({
      studentId: new UniqueEntityID('student-1'),
      exerciseId: new UniqueEntityID('exercise-1'),
    })

    inMemoryExerciseExecutionsRepository.create(exerciseExecution)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.exerciseExecutions).toHaveLength(1)
  })
})
