import { beforeEach, describe, expect, it } from 'vitest'
import { CreateExerciseUseCase } from './create-exercise'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'
import { UsersAutorizationService } from '../../../../core/repositories/users-autorization-service'
import { UserAutorizationServiceImpl } from '../../../identity-management/applications/services/user-autorization-service'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { Admin } from '../../../identity-management/enterprise/entities/admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeStudent } from 'test/factories/make-student'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let userAutorizationService: UsersAutorizationService
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateExerciseUseCase

describe('Create Exercise', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    userAutorizationService = new UserAutorizationServiceImpl(
      inMemoryUsersRepository,
    )
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    sut = new CreateExerciseUseCase(
      userAutorizationService,
      inMemoryExercisesRepository,
    )
  })

  it('should be able to create a exercise', async () => {
    const admin = Admin.create(
      {
        name: 'felipe amorim',
        email: 'felipecastroo.ads@gmail.com',
        password: '123456',
      },
      new UniqueEntityID('admin-1'),
    )

    inMemoryUsersRepository.create(admin)

    await sut.execute({
      userId: 'admin-1',
      name: 'Supino Reto',
      videoUrl: 'http://youtube.com/supinoreto',
      description: 'Descrição',
      groupMuscle: [{ id: '1', name: 'Peito' }],
    })

    expect(inMemoryExercisesRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Supino Reto',
      }),
    )
  })
  it('should not be able to create a exercise with student user', async () => {
    const student = makeStudent({}, new UniqueEntityID('student-1'))
    inMemoryUsersRepository.create(student)

    const result = await sut.execute({
      userId: 'student-1',
      name: 'Supino Reto',
      videoUrl: 'http://youtube.com/supinoreto',
      description: 'Descrição',
      groupMuscle: [{ id: '1', name: 'Peito' }],
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
