import { CreateMyProgressUpdateUseCase } from './create-my-progress-update'
import { InMemoryMyProgressRepository } from 'test/repositories/in-memory-my-progress-repository'

let inMemoryMyProgressRepository: InMemoryMyProgressRepository

let sut: CreateMyProgressUpdateUseCase

describe('Create My Progress Update', () => {
  beforeEach(() => {
    inMemoryMyProgressRepository = new InMemoryMyProgressRepository()
    sut = new CreateMyProgressUpdateUseCase(inMemoryMyProgressRepository)
  })

  it('should be able to create a progress update', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      comment: 'O que acha do meu fisico atual',
      photo: 'student-photo.jpg',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryMyProgressRepository.items[0]).toEqual(
      expect.objectContaining({
        comment: 'O que acha do meu fisico atual',
      }),
    )
  })
})
