import { InMemoryExerciseExecutionsRepository } from "test/repositories/in-memory-exercise-executions-repository"
import { FetchExerciseExecutionsUseCase } from "./fetch-exercise-executions"
import { makeExerciseExecution } from "test/factories/make-exercise-execution"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryExerciseExecutionsRepository: InMemoryExerciseExecutionsRepository
let sut: FetchExerciseExecutionsUseCase

describe("Fetch Exercise Executions", () => {
  beforeEach(() => {
    inMemoryExerciseExecutionsRepository = new InMemoryExerciseExecutionsRepository()
    sut = new FetchExerciseExecutionsUseCase(inMemoryExerciseExecutionsRepository)
  })

  it("should be able do fetch recent exercise executions", async () => {
    const exerciseExecution = makeExerciseExecution({
      studentId: new UniqueEntityID('student-1'),
      exerciseId: new UniqueEntityID('exercise-1')
    })

    inMemoryExerciseExecutionsRepository.create(exerciseExecution)

    const result = await sut.execute({
      studentId: 'student-1',
      exerciseId: 'exercise-1',
      page: 1
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.exerciseExecutions).toHaveLength(1)
  })

  it("should be able do fetch recent exercise paginated", async () => {
    for (let i = 0; i < 22; i++) {
      const exerciseExecution = makeExerciseExecution({
        studentId: new UniqueEntityID('student-1'),
        exerciseId: new UniqueEntityID('exercise-1')
      })
      inMemoryExerciseExecutionsRepository.create(exerciseExecution)
    }

    const result = await sut.execute({
      studentId: 'student-1',
      exerciseId: 'exercise-1',
      page: 2
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.exerciseExecutions).toHaveLength(2)
  })
})