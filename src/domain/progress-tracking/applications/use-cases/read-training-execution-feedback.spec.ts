import { InMemoryTrainingExecutionsRepository } from "test/repositories/in-memory-training-executions-repository"
import { ReadTrainingExecutionFeedbackUseCase } from "./read-training-execution-feedback"
import { makeTrainingExecution } from "test/factories/make-training-execution"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryTrainingExecutionsRepository: InMemoryTrainingExecutionsRepository
let sut: ReadTrainingExecutionFeedbackUseCase

describe("Read Training Execution Feedback", () => {
  beforeEach(() => {
    inMemoryTrainingExecutionsRepository = new InMemoryTrainingExecutionsRepository()
    sut = new ReadTrainingExecutionFeedbackUseCase(inMemoryTrainingExecutionsRepository)
  })

  it("should be able to read a training execution feedback", async () => {
    const trainingExecution = makeTrainingExecution({}, new UniqueEntityID('training-execution-1'))
    inMemoryTrainingExecutionsRepository.create(trainingExecution)

    const result = await sut.execute({
      trainingExecutionId: trainingExecution.id.toString()
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryTrainingExecutionsRepository.items[0].readAt).toEqual(expect.any(Date))
  })
})