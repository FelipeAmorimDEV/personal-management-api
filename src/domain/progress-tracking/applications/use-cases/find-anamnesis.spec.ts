import { InMemoryAnamnesisRepository } from 'test/repositories/in-memory-anamnesis-repository'
import { FindAnamnesisUseCase } from './find-anamnesis'
import { makeAnamnesis } from 'test/factories/make-anamnesis'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
let inMemoryAnamnesisRepository: InMemoryAnamnesisRepository
let sut: FindAnamnesisUseCase
describe('Find Anamnesis', () => {
  beforeEach(() => {
    inMemoryAnamnesisRepository = new InMemoryAnamnesisRepository()
    sut = new FindAnamnesisUseCase(inMemoryAnamnesisRepository)
  })
  it('should be find anamnesis', async () => {
    const anamnesis = makeAnamnesis({}, new UniqueEntityID('anamnesis-1'))
    inMemoryAnamnesisRepository.create(anamnesis)

    const result = await sut.execute({
      anamnesisId: 'anamnesis-1',
    })

    if (result.isLeft()) {
      throw new Error()
    }

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.anamnesis.id).toBeTruthy()
  })
})
