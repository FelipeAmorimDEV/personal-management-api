import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateStudentUseCase } from './create-student'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: CreateStudentUseCase

describe('Create Student', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateStudentUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to create a student', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'John Doe',
    })
  })

  it('should be able to hash a student password', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(inMemoryUsersRepository.items[0].password).toEqual('123456-hashed')
  })

  it('should not be able to create a student with duplicate e-mail', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
  })
})
