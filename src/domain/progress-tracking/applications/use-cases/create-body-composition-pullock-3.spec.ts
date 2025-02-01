import { InMemoryBodyCompositionsRepository } from 'test/repositories/in-memory-body-compositions-repository'
import { CreateBodyCompositionPollock3UseCase } from './create-body-composition-pullock-3'

let sut: CreateBodyCompositionPollock3UseCase
let inMemoryBodyCompositionsRepository: InMemoryBodyCompositionsRepository
describe('Create Body Composition Pullock 3', () => {
  beforeEach(() => {
    inMemoryBodyCompositionsRepository =
      new InMemoryBodyCompositionsRepository()
    sut = new CreateBodyCompositionPollock3UseCase(
      inMemoryBodyCompositionsRepository,
    )
  })

  it('should be able to create a body composition', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      height: 163,
      weight: 80,
      age: 29,
      gender: 'MALE',
      abdominal: 90,
      chest: 120,
      hip: 70,
      waist: 100,
      suprailiac: 80,
      thigh: 60,
      triceps: 22,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryBodyCompositionsRepository.items[0]).toEqual(
      expect.objectContaining({
        gender: 'MALE',
      }),
    )
    expect(inMemoryBodyCompositionsRepository.items[0].bmi).toEqual(
      80 / Math.pow(163 / 100, 2),
    )
    expect(inMemoryBodyCompositionsRepository.items[0].methodName).toEqual(
      'Pullock 3 Dobras',
    )
  })
})
