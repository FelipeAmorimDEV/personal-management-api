import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'
import { Admin } from '@/domain/identity-management/enterprise/entities/admin'
import { Student } from '@/domain/identity-management/enterprise/entities/student'

export class InMemoryUsersRepository implements UsersRepository {
  public items: Student[] | Admin[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email.toString() === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string) {
    const user = this.items.find((item) => item.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: Student | Admin) {
    this.items.push(user)
  }

  async save(user: Student | Admin) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
    this.items[itemIndex] = user
  }

  async delete(user: Student | Admin) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
    this.items.splice(itemIndex, 1)
  }
}
