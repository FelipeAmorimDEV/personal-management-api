import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { FetchRecentTrainingFeedbackUseCase } from './fetch-recent-training-feedback-user'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'

let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository

let sut: FetchRecentTrainingFeedbackUseCase

describe('Fetch Training Feedback User', () => {
  beforeEach(() => {
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryTrainingFeedbacksRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryReplyTrainingFeedbackRepository,
      )

    sut = new FetchRecentTrainingFeedbackUseCase(
      inMemoryTrainingFeedbacksRepository,
    )
  })

  it('should be able to fetch recent training feedbacks by user', async () => {
    const feedback = makeTrainingFeedback({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryTrainingFeedbacksRepository.create(feedback)

    const result = await sut.execute({ userId: 'student-1' })

    if (result.isRight()) {
      expect(result.value.trainingFeedbacks).toHaveLength(1)
    }
  })
  it('should be able to fetch recent training feedbacks and personal answer by user', async () => {
    const feedback = makeTrainingFeedback({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryTrainingFeedbacksRepository.create(feedback)
    const reply = TrainingFeedbackReply.create({
      trainingFeedbackId: feedback.id,
      reply: 'Boa, continue assim',
    })
    inMemoryReplyTrainingFeedbackRepository.create(reply)

    const result = await sut.execute({ userId: 'student-1' })

    if (result.isRight()) {
      expect(result.value.trainingFeedbacks[0].personalAnswer?.id).toBeTruthy()
      expect(result.value.trainingFeedbacks[0].personalAnswer?.reply).toEqual(
        reply.reply,
      )
    }
  })
})
