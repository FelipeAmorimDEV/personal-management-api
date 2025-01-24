import { InMemoryExerciseExecutionsRepository } from 'test/repositories/in-memory-exercise-executions-repository'
import { makeExerciseExecution } from 'test/factories/make-exercise-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FindRecentWeightUseCase } from './find-recent-weight'

let inMemoryExerciseExecutionsRepository: InMemoryExerciseExecutionsRepository
let sut: FindRecentWeightUseCase

describe('Fetch Recent Weight', () => {
  beforeEach(() => {
    inMemoryExerciseExecutionsRepository =
      new InMemoryExerciseExecutionsRepository()
    sut = new FindRecentWeightUseCase(inMemoryExerciseExecutionsRepository)
  })

  it('should be able do find recent weight', async () => {
    const exerciseExecution = makeExerciseExecution({
      studentId: new UniqueEntityID('student-1'),
      exerciseId: new UniqueEntityID('exercise-1'),
      weightUsed: 40,
    })

    inMemoryExerciseExecutionsRepository.create(exerciseExecution)

    const result = await sut.execute({
      studentId: 'student-1',
      exerciseId: 'exercise-1',
    })

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(result.value.exerciseExecution.weightUsed).toEqual(
        exerciseExecution.weightUsed,
      )
    }
  })
})
