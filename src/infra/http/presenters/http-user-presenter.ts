import { Student } from '@/domain/identity-management/enterprise/entities/student'

export class HttpUserPresenter {
  static toHTTP(user: Student) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar ?? 'teste',
    }
  }
}
