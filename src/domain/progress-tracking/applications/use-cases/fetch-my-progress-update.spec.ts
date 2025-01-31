import { InMemoryMyProgressRepository } from 'test/repositories/in-memory-my-progress-repository'
import { FetchMyProgressUpdateUseCase } from './fetch-my-progress-update'
import { makeMyProgressUpdate } from 'test/factories/make-my-progress-update'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryMyProgressAnswerRepository } from 'test/repositories/in-memory-my-progress-answer-repository'
import { makeStudent } from 'test/factories/make-student'
import { makeAdmin } from 'test/factories/make-admin'
import { MyProgressAnswer } from '../../enterprise/entities/my-progress-answer'

let inMemoryMyProgressRepository: InMemoryMyProgressRepository
let inMemoryMyProgressAnswerRepository: InMemoryMyProgressAnswerRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: FetchMyProgressUpdateUseCase

describe('Fetch My Progress Updates', () => {
  beforeEach(() => {
    inMemoryMyProgressAnswerRepository =
      new InMemoryMyProgressAnswerRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryMyProgressRepository = new InMemoryMyProgressRepository(
      inMemoryUsersRepository,
      inMemoryMyProgressAnswerRepository,
    )
    sut = new FetchMyProgressUpdateUseCase(inMemoryMyProgressRepository)
  })

  it('should be able to fetch my progress updates', async () => {
    const user = makeStudent({}, new UniqueEntityID('student-1'))
    inMemoryUsersRepository.create(user)

    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    const myProgressUpdate = makeMyProgressUpdate({
      studentId: new UniqueEntityID('student-1'),
    })
    inMemoryMyProgressRepository.create(myProgressUpdate)

    const myProgressAnswer = MyProgressAnswer.create({
      adminId: admin.id,
      progressId: myProgressUpdate.id,
      reply: 'Continue assim',
    })

    inMemoryMyProgressAnswerRepository.create(myProgressAnswer)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.myProgressUpdates).toHaveLength(1)
    expect(result.value?.myProgressUpdates[0].studentId).toEqual(
      expect.objectContaining({
        value: 'student-1',
      }),
    )
  })
})
