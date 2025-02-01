import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchBodyCompositionUseCase } from './fetch-body-composition'
import { InMemoryBodyCompositionsRepository } from 'test/repositories/in-memory-body-compositions-repository'
import { makeBodyComposition } from 'test/factories/make-body-composition'

let sut: FetchBodyCompositionUseCase
let inMemoryBodyCompositionsRepository: InMemoryBodyCompositionsRepository

describe('Fetch Body Compositions', () => {
  beforeEach(() => {
    inMemoryBodyCompositionsRepository =
      new InMemoryBodyCompositionsRepository()
    sut = new FetchBodyCompositionUseCase(inMemoryBodyCompositionsRepository)
  })

  it('should be able do fetch body compositions', async () => {
    const bodyComposition = makeBodyComposition({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryBodyCompositionsRepository.items.push(bodyComposition)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.bodyCompositions).length(1)
  })
})
