import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { CreateTrainingExecutionFeedbackUseCase } from './create-training-feedback'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'

let inMemoryTrainingExecutionsRepository: InMemoryTrainingExecutionsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let sut: CreateTrainingExecutionFeedbackUseCase

describe('Create Training Execution Feedback', () => {
  beforeEach(() => {
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryTrainingExecutionsRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryReplyTrainingFeedbackRepository,
      )
    sut = new CreateTrainingExecutionFeedbackUseCase(
      inMemoryTrainingExecutionsRepository,
    )
  })

  it('should be able to create a training execution feedbacks', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      trainingId: 'training-1',
      comment: 'Achei facil',
      rate: 5,
      exercises: [
        {
          exerciseId: 'exercise-1',
          weightUsed: 20,
        },
        {
          exerciseId: 'exercise-2',
          weightUsed: 10,
        },
      ],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryTrainingExecutionsRepository.items[0]).toEqual(
      expect.objectContaining({
        comment: 'Achei facil',
      }),
    )
  })
})
