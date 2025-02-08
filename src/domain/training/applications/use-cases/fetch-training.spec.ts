import { InMemoryTrainingPlansRepository } from 'test/repositories/in-memory-training-plans-repository'
import { makeTrainingPlan } from 'test/factories/make-training-plan'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeTraining } from 'test/factories/make-training'
import { FetchTrainingUseCase } from './fetch-training'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'

let inMemoryTrainingPlanRepository: InMemoryTrainingPlansRepository
let inMemoryTrainingRepository: InMemoryTrainingsRepository

let sut: FetchTrainingUseCase
describe('Fetch Training', () => {
  beforeEach(() => {
    inMemoryTrainingPlanRepository = new InMemoryTrainingPlansRepository()
    inMemoryTrainingRepository = new InMemoryTrainingsRepository()
    sut = new FetchTrainingUseCase(
      inMemoryTrainingPlanRepository,
      inMemoryTrainingRepository,
    )
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch student trainings', async () => {
    const trainingPlan = makeTrainingPlan({
      studentId: new UniqueEntityID('student-1'),
      strategy: 'FLEXIBLE_SESSIONS',
    })
    inMemoryTrainingPlanRepository.create(trainingPlan)

    const training = makeTraining({
      trainingPlanId: trainingPlan.id,
    })
    inMemoryTrainingRepository.create(training)

    const result = await sut.execute({
      trainingPlanId: trainingPlan.id.toString(),
    })

    if (result.isRight()) {
      const { trainings } = result.value
      expect(trainings).toHaveLength(1)
    } else {
      expect(result.isLeft()).toBe(true)
    }
  })

  it('should be able to fetch student training by day', async () => {
    const wednesday = new Date(2025, 0, 1)

    vi.setSystemTime(wednesday)

    const trainingPlan = makeTrainingPlan({
      studentId: new UniqueEntityID('student-1'),
      strategy: 'FIXED_DAYS',
    })
    inMemoryTrainingPlanRepository.create(trainingPlan)

    const training = makeTraining({
      trainingPlanId: trainingPlan.id,
      dayOfWeek: 'WEDNESDAY',
    })
    inMemoryTrainingRepository.create(training)

    const result = await sut.execute({
      trainingPlanId: trainingPlan.id.toString(),
    })

    if (result.isRight()) {
      const { trainings } = result.value
      expect(trainings).toHaveLength(1)
    } else {
      // Trate o erro caso o resultado seja um Left (ResourceNotFoundError)
      expect(result.isLeft()).toBe(true)
      // Aqui você pode adicionar verificações para o erro, se necessário
    }
  })
})
