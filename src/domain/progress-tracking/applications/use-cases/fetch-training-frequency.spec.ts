import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { FetchTrainingFrequencyUseCase } from './fetch-training-frequency'

let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let sut: FetchTrainingFrequencyUseCase

describe('Fetch Training Frequency', () => {
  beforeEach(() => {
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryTrainingFeedbacksRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryReplyTrainingFeedbackRepository,
      )
    vi.useFakeTimers()

    sut = new FetchTrainingFrequencyUseCase(inMemoryTrainingFeedbacksRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch training Frequency', async () => {
    const firstDate = new Date('2025-01-19T03:00:00')
    const secondDate = new Date('2025-01-20T03:00:00')

    vi.setSystemTime(new Date(firstDate))
    const trainingFeedback = makeTrainingFeedback({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryTrainingFeedbacksRepository.create(trainingFeedback)
    vi.setSystemTime(secondDate)
    const secondTrainingFeedback = makeTrainingFeedback({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryTrainingFeedbacksRepository.create(secondTrainingFeedback)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    if (result.isRight()) {
      expect(result.value.frequencyTraining).toHaveLength(7)
      expect(result.value.frequencyTraining[0].isTraining).toEqual(true)
      expect(result.value.frequencyTraining[0].isInvalid).toEqual(false)
      expect(result.value.frequencyTraining[1].isInvalid).toEqual(false)
      expect(result.value.frequencyTraining[1].isTraining).toEqual(true)
    }
  })
})
