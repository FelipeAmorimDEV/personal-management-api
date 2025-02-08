import { InMemoryBodyCompositionsRepository } from 'test/repositories/in-memory-body-compositions-repository'
import { FindBodyCompositionUseCase } from './find-body-composition'
import { makeBodyComposition } from 'test/factories/make-body-composition'
let inMemoryBodyCompositions: InMemoryBodyCompositionsRepository
let sut: FindBodyCompositionUseCase
describe('Find Body Composition', () => {
  beforeEach(() => {
    inMemoryBodyCompositions = new InMemoryBodyCompositionsRepository()
    sut = new FindBodyCompositionUseCase(inMemoryBodyCompositions)
  })
  it('should be able to find a body composition', async () => {
    const bodyComposition = makeBodyComposition({})
    inMemoryBodyCompositions.create(bodyComposition)

    const result = await sut.execute({
      assessmentId: bodyComposition.id.toString(),
    })

    expect(result.isRight())
  })
})
