import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTrainingPlansRepository } from 'test/repositories/in-memory-training-plans-repository'
import { CreateTrainingPlanUseCase } from './create-training-plan'

import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UserAutorizationServiceImpl } from '../../../identity-management/applications/services/user-autorization-service'
import { makeAdmin } from 'test/factories/make-admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeStudent } from 'test/factories/make-student'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryTrainingPlansRepository: InMemoryTrainingPlansRepository
let userAutorizationService: UserAutorizationServiceImpl
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateTrainingPlanUseCase

describe('Create Training Plan', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    userAutorizationService = new UserAutorizationServiceImpl(
      inMemoryUsersRepository,
    )
    inMemoryTrainingPlansRepository = new InMemoryTrainingPlansRepository()
    sut = new CreateTrainingPlanUseCase(
      userAutorizationService,
      inMemoryTrainingPlansRepository,
    )
  })

  it('should be able to create a training plan', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    await sut.execute({
      userId: 'admin-1',
      studentId: 'student-1',
      name: 'Treino Hipertrofia',
      goal: 'Hipertrofia',
      sessionsPerWeek: 3,
      strategy: 'FIXED_DAYS',
      trainingLevel: 'BEGINNER',
      startDate: new Date(2024, 6, 10).toString(),
      endDate: new Date(2024, 9, 10).toString(),
    })

    expect(inMemoryTrainingPlansRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Treino Hipertrofia',
      }),
    )
  })

  it('should not be able to create a training plan with student user', async () => {
    const student = makeStudent({}, new UniqueEntityID('student-1'))
    inMemoryUsersRepository.create(student)

    const result = await sut.execute({
      userId: 'student-1',
      studentId: 'student-1',
      name: 'Treino Hipertrofia',
      goal: 'Hipertrofia',
      sessionsPerWeek: 3,
      strategy: 'FIXED_DAYS',
      trainingLevel: 'BEGINNER',
      startDate: new Date(2024, 6, 10).toString(),
      endDate: new Date(2024, 9, 10).toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
