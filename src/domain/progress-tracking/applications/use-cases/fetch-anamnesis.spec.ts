import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnamnesisRepository } from 'test/repositories/in-memory-anamnesis-repository'
import { FetchAnamnesisUseCase } from './fetch-anamnesis'
import { makeAnamnesis } from 'test/factories/make-anamnesis'

let sut: FetchAnamnesisUseCase
let inMemoryAnamnesisRepository: InMemoryAnamnesisRepository

describe('Fetch Anamnesis', () => {
  beforeEach(() => {
    inMemoryAnamnesisRepository = new InMemoryAnamnesisRepository()
    sut = new FetchAnamnesisUseCase(inMemoryAnamnesisRepository)
  })

  it('should be able do fetch anamnesis', async () => {
    const anamnesis = makeAnamnesis({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryAnamnesisRepository.items.push(anamnesis)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.anamnesis).length(1)
  })
})
