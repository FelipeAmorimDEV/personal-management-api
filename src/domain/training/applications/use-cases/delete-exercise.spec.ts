import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'
import { Exercise } from '../../enterprise/entities/exercise'
import { DeleteExerciseUseCase } from './delete-exercise'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UserAutorizationServiceImpl } from '../../../identity-management/applications/services/user-autorization-service'
import { makeAdmin } from 'test/factories/make-admin'
import { makeStudent } from 'test/factories/make-student'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let userAutorizationService: UserAutorizationServiceImpl
let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: DeleteExerciseUseCase

describe('Delete Exercise', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    userAutorizationService = new UserAutorizationServiceImpl(
      inMemoryUsersRepository,
    )
    sut = new DeleteExerciseUseCase(
      userAutorizationService,
      inMemoryExercisesRepository,
    )
  })

  it('should be able to delete an exercise', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    const exerciseCreated = Exercise.create(
      {
        name: 'Supino Inclinado',
        videoUrl: 'http://youtube.com/supinoinclinado',
        description: 'Descrição',
      },
      new UniqueEntityID('exercise-1'),
    )

    await inMemoryExercisesRepository.create(exerciseCreated)

    await sut.execute({
      userId: 'admin-1',
      exerciseId: 'exercise-1',
    })

    expect(inMemoryExercisesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an exercise with student account', async () => {
    const student = makeStudent({}, new UniqueEntityID('student-1'))
    inMemoryUsersRepository.create(student)

    const exerciseCreated = Exercise.create(
      {
        name: 'Supino Inclinado',
        videoUrl: 'http://youtube.com/supinoinclinado',
        description: 'Descrição',
      },
      new UniqueEntityID('exercise-1'),
    )
    await inMemoryExercisesRepository.create(exerciseCreated)

    const result = await sut.execute({
      userId: 'student-1',
      exerciseId: 'exercise-1',
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
