import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ReadReplyTrainingFeedbackUseCase } from './read-reply-training-feedback'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'

let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let sut: ReadReplyTrainingFeedbackUseCase

describe('Read Reply Training Feedback', () => {
  beforeEach(() => {
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()

    sut = new ReadReplyTrainingFeedbackUseCase(
      inMemoryReplyTrainingFeedbackRepository,
    )
  })

  it('should be able to reply a training feedback', async () => {
    const trainingFeedbackReply = TrainingFeedbackReply.create(
      {
        trainingFeedbackId: new UniqueEntityID('feedback-1'),
        reply: 'continue assim',
      },
      new UniqueEntityID('reply-feedback-1'),
    )
    inMemoryReplyTrainingFeedbackRepository.create(trainingFeedbackReply)

    const result = await sut.execute({
      replyTrainingFeedbackId: 'reply-feedback-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryReplyTrainingFeedbackRepository.items[0].readAt).toBeTruthy()
  })
})
