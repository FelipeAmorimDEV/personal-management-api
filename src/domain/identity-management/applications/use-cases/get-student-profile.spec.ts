import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeStudent } from 'test/factories/make-student'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetStudentProfileUseCase } from './get-student-profile'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetStudentProfileUseCase

describe('Get Student Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetStudentProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get a student profile', async () => {
    const newStudent = makeStudent(
      { name: 'John Doe' },
      new UniqueEntityID('student-1'),
    )
    inMemoryUsersRepository.create(newStudent)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    if (result.isRight()) {
      expect(result.value.profile).toEqual(
        expect.objectContaining({
          name: newStudent.name,
          email: newStudent.email,
        }),
      )
    }
  })
})
