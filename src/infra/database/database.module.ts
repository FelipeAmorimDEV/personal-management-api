import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'
import { PrismaService } from './prisma/prisma.service'
import { ExercisesRepository } from '@/domain/training/applications/repositories/exercises-repository'
import { PrismaExercisesRepository } from './prisma/repositories/prisma-exercises-repository'
import { UsersAutorizationService } from '@/domain/training/applications/repositories/users-autorization-service'
import { UserAutorizationServiceImpl } from '@/domain/identity-management/applications/services/user-autorization-service'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ExercisesRepository,
      useClass: PrismaExercisesRepository,
    },
    {
      provide: UsersAutorizationService,
      useClass: UserAutorizationServiceImpl,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ExercisesRepository,
    UsersAutorizationService,
  ],
})
export class DatabaseModule {}
