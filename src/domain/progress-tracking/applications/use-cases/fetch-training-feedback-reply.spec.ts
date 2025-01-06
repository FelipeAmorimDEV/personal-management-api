import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { FetchTrainingFeedbackReplyUseCase } from './fetch-training-feedback-reply'
import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'

let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let sut: FetchTrainingFeedbackReplyUseCase

describe('Fetch Training Feedback Reply', () => {
  beforeEach(() => {
    inMemoryTrainingFeedbacksRepository =
      new InMemoryTrainingExecutionsRepository()
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository(
        inMemoryTrainingFeedbacksRepository,
      )
    sut = new FetchTrainingFeedbackReplyUseCase(
      inMemoryReplyTrainingFeedbackRepository,
    )
  })

  it('should be able to fetch all training feedback reply', async () => {
    const trainingFeedback = TrainingFeedback.create({
      trainingId: new UniqueEntityID('training-1'),
      comment: 'otimo treino',
      rate: 3,
      studentId: new UniqueEntityID('student-1'),
    })

    inMemoryTrainingFeedbacksRepository.create(trainingFeedback)

    const trainingFeedbackReply = TrainingFeedbackReply.create({
      trainingFeedbackId: trainingFeedback.id,
      reply: 'Continue assim',
    })
    inMemoryReplyTrainingFeedbackRepository.create(trainingFeedbackReply)

    const result = await sut.execute({ studentId: 'student-1' })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.feedbacksReplies).toHaveLength(1)
  })
})
