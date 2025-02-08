import { InMemoryTrainingPlansRepository } from 'test/repositories/in-memory-training-plans-repository'
import { UpdateExpiredPlansUseCase } from './update-expired-plans'
import { makeTrainingPlan } from 'test/factories/make-training-plan'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryTrainingPlansRepository: InMemoryTrainingPlansRepository
let sut: UpdateExpiredPlansUseCase

describe('UpdateExpiredPlans', () => {
  beforeEach(() => {
    inMemoryTrainingPlansRepository = new InMemoryTrainingPlansRepository()
    sut = new UpdateExpiredPlansUseCase(inMemoryTrainingPlansRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be expire training plans', async () => {
    const trainingPLan = makeTrainingPlan({}, new UniqueEntityID('training-1'))
    inMemoryTrainingPlansRepository.create(trainingPLan)
    expect(inMemoryTrainingPlansRepository.items[0].status).toEqual('ACTIVE')
    vi.setSystemTime(new Date(2025, 1, 10))
    await sut.execute()
    expect(inMemoryTrainingPlansRepository.items[0].status).toEqual('EXPIRED')
  })
})
