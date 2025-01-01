import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'
import { EditExerciseUseCase } from './edit-exercise'
import { Exercise } from '../../enterprise/entities/exercise'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UserAutorizationServiceImpl } from '../../../identity-management/applications/services/user-autorization-service'
import { makeAdmin } from 'test/factories/make-admin'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { makeStudent } from 'test/factories/make-student'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let userAutorizationService: UserAutorizationServiceImpl
let sut: EditExerciseUseCase

describe('Edit Exercise', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    userAutorizationService = new UserAutorizationServiceImpl(
      inMemoryUsersRepository,
    )
    sut = new EditExerciseUseCase(
      userAutorizationService,
      inMemoryExercisesRepository,
    )
  })

  it('should be able to edit a exercise', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    const exerciseCreated = Exercise.create({
      name: 'Supino Inclinado',
      videoUrl: 'http://youtube.com/supinoinclinado',
      description: 'Descrição',
    })

    await inMemoryExercisesRepository.create(exerciseCreated)

    await sut.execute({
      userId: 'admin-1',
      exerciseId: exerciseCreated.id.toString(),
      name: 'Supino Reto',
      description: 'Descrição Alterada',
    })

    expect(inMemoryExercisesRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Supino Reto',
      }),
    )
    expect(inMemoryExercisesRepository.items[0]).toEqual(
      expect.objectContaining({
        videoUrl: 'http://youtube.com/supinoinclinado',
      }),
    )
  })

  it('should not be able to edit a exercise with student account', async () => {
    const student = makeStudent({}, new UniqueEntityID('student-1'))
    inMemoryUsersRepository.create(student)

    const exerciseCreated = Exercise.create({
      name: 'Supino Inclinado',
      videoUrl: 'http://youtube.com/supinoinclinado',
      description: 'Descrição',
    })

    await inMemoryExercisesRepository.create(exerciseCreated)

    const result = await sut.execute({
      userId: 'student-1',
      exerciseId: exerciseCreated.id.toString(),
      name: 'Supino Reto',
      description: 'Descrição Alterada',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
