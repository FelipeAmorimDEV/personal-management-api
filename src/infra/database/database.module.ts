import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'
import { PrismaService } from './prisma/prisma.service'
import { ExercisesRepository } from '@/domain/training/applications/repositories/exercises-repository'
import { PrismaExercisesRepository } from './prisma/repositories/prisma-exercises-repository'
import { UsersAutorizationService } from '@/core/repositories/users-autorization-service'
import { UserAutorizationServiceImpl } from '@/domain/identity-management/applications/services/user-autorization-service'
import { PrismaTrainingPlansRepository } from './prisma/repositories/prisma-training-plans-repository'
import { TrainingPlansRepository } from '@/domain/training/applications/repositories/training-plans-repository'
import { TrainingsRepository } from '@/domain/training/applications/repositories/trainings-repository'
import { PrismaTrainingRepository } from './prisma/repositories/prisma-training-repository'
import { StudentExercisesRepository } from '@/domain/training/applications/repositories/student-exercises-repository'
import { PrismaStudentExercisesRepository } from './prisma/repositories/prisma-student-exercises-repository'
import { ExerciseExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/exercise-executions-repository'
import { PrismaExerciseExecutionsRepository } from './prisma/repositories/prisma-exercise-executions-repository'
import { ReplyTrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/reply-training-feedbacks-repository'
import { PrismaReplyTrainingFeedbacksRepository } from './prisma/repositories/prisma-reply-training-feedbacks-repository'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { PrismaTrainingFeedbacksRepository } from './prisma/repositories/prisma-training-feedbacks-repository'
import { MyProgressRepository } from '@/domain/progress-tracking/applications/repositories/my-progress-repository'
import { PrismaMyProgressRepository } from './prisma/repositories/prisma-my-progress-repository'
import { MyProgressAnswerRepository } from '@/domain/progress-tracking/applications/repositories/my-progress-answer-repository'
import { PrismaMyProgressAnswerRepository } from './prisma/repositories/prisma-my-progress-answer-repository'
import { BodyCompositionsRepository } from '@/domain/progress-tracking/applications/repositories/body-compositions-repository'
import { PrismaBodyCompositionsRepository } from './prisma/repositories/prisma-body-compositions-repository'
import { AnamnesisRepository } from '@/domain/progress-tracking/applications/repositories/anamnesis-repository'
import { PrismaAnamnesisRepository } from './prisma/repositories/prisma-anamnesis-repository'
import { PaymentsRepository } from '@/domain/payments/applications/repositories/payments-repository'
import { PrismaPaymentRepository } from './prisma/repositories/prisma-payment-repository'
import { AchievementsRepository } from '@/domain/progress-tracking/applications/repositories/achievements-repository'
import { PrismaAchievementsRepository } from './prisma/repositories/prisma-achievements-repository'
import { StudentAchievementsRepository } from '@/domain/progress-tracking/applications/repositories/student-achievements-repository'
import { PrismaStudentAchievementsRepository } from './prisma/repositories/prisma-student-achievements-repository'

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
      useClass: PrismaStudentExercisesRepository,
    },
    {
      provide: ExerciseExecutionsRepository,
      useClass: PrismaExerciseExecutionsRepository,
    },
    {
      provide: ReplyTrainingFeedbacksRepository,
      useClass: PrismaReplyTrainingFeedbacksRepository,
    },
    {
      provide: TrainingFeedbacksRepository,
      useClass: PrismaTrainingFeedbacksRepository,
    },
    {
      provide: MyProgressRepository,
      useClass: PrismaMyProgressRepository,
    },
    {
      provide: MyProgressAnswerRepository,
      useClass: PrismaMyProgressAnswerRepository,
    },
    {
      provide: BodyCompositionsRepository,
      useClass: PrismaBodyCompositionsRepository,
    },
    {
      provide: AnamnesisRepository,
      useClass: PrismaAnamnesisRepository,
    },
    {
      provide: PaymentsRepository,
      useClass: PrismaPaymentRepository,
    },
    {
      provide: AchievementsRepository,
      useClass: PrismaAchievementsRepository,
    },
    {
      provide: StudentAchievementsRepository,
      useClass: PrismaStudentAchievementsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ExercisesRepository,
    UsersAutorizationService,
    TrainingPlansRepository,
    TrainingsRepository,
    StudentExercisesRepository,
    ExerciseExecutionsRepository,
    ReplyTrainingFeedbacksRepository,
    TrainingFeedbacksRepository,
    MyProgressRepository,
    MyProgressAnswerRepository,
    BodyCompositionsRepository,
    AnamnesisRepository,
    PaymentsRepository,
    AchievementsRepository,
    StudentAchievementsRepository,
  ],
})
export class DatabaseModule {}
