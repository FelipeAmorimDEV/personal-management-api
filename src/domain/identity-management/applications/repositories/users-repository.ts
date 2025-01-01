import { Admin } from '../../enterprise/entities/admin'
import { Student } from '../../enterprise/entities/student'

export abstract class UsersRepository {
  abstract findById(userId: string): Promise<Student | null>
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(user: Student | Admin): Promise<void>
  abstract save(user: Student | Admin): Promise<void>
  abstract delete(user: Student | Admin): Promise<void>
}
