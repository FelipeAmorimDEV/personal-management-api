import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditStudentUseCase } from './edit-student'
import { makeStudent } from 'test/factories/make-student'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditStudentUseCase

describe('Edit Student', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditStudentUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit a student', async () => {
    const newStudent = makeStudent(
      { name: 'John Doe' },
      new UniqueEntityID('student-1'),
    )
    inMemoryUsersRepository.create(newStudent)

    await sut.execute({
      studentId: 'student-1',
      name: 'Felipe Amorim',
    })

    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'Felipe Amorim',
    })
  })

  it('should not be able to efit a inexistent student', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      name: ' Felipe Amorim',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})