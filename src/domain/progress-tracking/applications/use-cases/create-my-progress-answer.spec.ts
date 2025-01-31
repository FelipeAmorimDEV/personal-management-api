import { InMemoryMyProgressAnswerRepository } from 'test/repositories/in-memory-my-progress-answer-repository'
import { CreateMyProgressAnswerUseCase } from './create-my-progress-answer'
import { UserAutorizationServiceImpl } from '@/domain/identity-management/applications/services/user-autorization-service'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeAdmin } from 'test/factories/make-admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { InMemoryMyProgressRepository } from 'test/repositories/in-memory-my-progress-repository'
import { makeMyProgressUpdate } from 'test/factories/make-my-progress-update'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

let inMemoryMyProgressAnswerRepository: InMemoryMyProgressAnswerRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let userAuthorization: UserAutorizationServiceImpl

let sut: CreateMyProgressAnswerUseCase
let inMemoryMyProgressRepository: InMemoryMyProgressRepository
describe('Create My Progress Answer', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryMyProgressAnswerRepository =
      new InMemoryMyProgressAnswerRepository()
    inMemoryMyProgressRepository = new InMemoryMyProgressRepository(
      inMemoryUsersRepository,
      inMemoryMyProgressAnswerRepository,
    )
    userAuthorization = new UserAutorizationServiceImpl(inMemoryUsersRepository)

    sut = new CreateMyProgressAnswerUseCase(
      inMemoryMyProgressRepository,
      inMemoryMyProgressAnswerRepository,
      userAuthorization,
    )
  })

  it('should be able to create a progress answer', async () => {
    const user = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(user)
    const progress = makeMyProgressUpdate({})
    inMemoryMyProgressRepository.create(progress)

    const result = await sut.execute({
      progressId: progress.id.toString(),
      userId: user.id.toString(),
      reply: 'Belo fisico',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryMyProgressAnswerRepository.items[0]).toEqual(
      expect.objectContaining({
        reply: 'Belo fisico',
      }),
    )
  })

  it('should not be able to create a progress answer by common user', async () => {
    const progress = makeMyProgressUpdate({}, new UniqueEntityID('progress-1'))
    inMemoryMyProgressRepository.create(progress)
    const result = await sut.execute({
      progressId: 'progress-1',
      userId: 'user-1',
      reply: 'Belo fisico',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to create a progress answer when my progress does not exists', async () => {
    const user = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(user)
    const result = await sut.execute({
      progressId: 'progress-1',
      userId: 'admin-1',
      reply: 'Belo fisico',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
