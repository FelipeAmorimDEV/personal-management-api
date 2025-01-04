import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'
import { PrismaService } from './prisma/prisma.service'
import { ExercisesRepository } from '@/domain/training/applications/repositories/exercises-repository'
import { PrismaExercisesRepository } from './prisma/repositories/prisma-exercises-repository'
import { UsersAutorizationService } from '@/domain/training/applications/repositories/users-autorization-service'
import { UserAutorizationServiceImpl } from '@/domain/identity-management/applications/services/user-autorization-service'
import { PrismaTrainingPlansRepository } from './prisma/repositories/prisma-training-plans-repository'
import { TrainingPlansRepository } from '@/domain/training/applications/repositories/training-plans-repository'
import { TrainingsRepository } from '@/domain/training/applications/repositories/trainings-repository'
import { PrismaTrainingRepository } from './prisma/repositories/prisma-training-repository'
import { StudentExercisesRepository } from '@/domain/training/applications/repositories/student-exercises-repository'
import { PrismaStudentExercisesRepository } from './prisma/repositories/prisma-student-exercises-repository'

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
    {
      provide: TrainingPlansRepository,
      useClass: PrismaTrainingPlansRepository,
    },
    {
      provide: TrainingsRepository,
      useClass: PrismaTrainingRepository,
    },
    {
      provide: StudentExercisesRepository,
      useClass: PrismaStudentExercisesRepository
    }
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ExercisesRepository,
    UsersAutorizationService,
    TrainingPlansRepository,
    TrainingsRepository,
    StudentExercisesRepository
  ],
})
export class DatabaseModule {}
