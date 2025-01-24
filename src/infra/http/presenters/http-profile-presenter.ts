import { Student } from '@/domain/identity-management/enterprise/entities/student'

export class HttpProfilePresenter {
  static toHTTP(student: Student) {
    return {
      name: student.name,
      email: student.email,
      role: student.role,
    }
  }
}
