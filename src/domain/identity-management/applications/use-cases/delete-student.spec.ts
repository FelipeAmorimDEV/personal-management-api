import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeStudent } from 'test/factories/make-student'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteStudentUseCase } from './delete-student'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteStudentUseCase

describe('Delete Student', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteStudentUseCase(inMemoryUsersRepository)
  })

  it('should be able to delete a student', async () => {
    const newStudent = makeStudent(
      { name: 'John Doe' },
      new UniqueEntityID('student-1'),
    )
    inMemoryUsersRepository.create(newStudent)

    await sut.execute({
      studentId: 'student-1',
    })

    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a inexistent student', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
