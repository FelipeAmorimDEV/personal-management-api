import { Injectable } from '@nestjs/common'
import { UsersAutorizationService } from '../../../training/applications/repositories/users-autorization-service'
import { UsersRepository } from '../repositories/users-repository'

@Injectable()
export class UserAutorizationServiceImpl implements UsersAutorizationService {
  constructor(private usersRepository: UsersRepository) {}
  async isAdmin(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return false
    }

    return user.role === 'ADMIN'
  }
}
