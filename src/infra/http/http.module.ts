import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateStudentUseCase } from '@/domain/identity-management/applications/use-cases/create-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateStudentUseCase } from '@/domain/identity-management/applications/use-cases/authenticate-student'
import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { CreateExerciseUseCase } from '@/domain/training/applications/use-cases/create-exercise'
import { CreateExerciseController } from './controllers/create-exercise.controller'
import { EditExerciseUseCase } from '@/domain/training/applications/use-cases/edit-exercise'
import { EditExerciseController } from './controllers/edit-exercise.controller'
import { DeleteExerciseController } from './controllers/delete-exercise.controller'
import { DeleteExerciseUseCase } from '@/domain/training/applications/use-cases/delete-exercise'
import { CreateTrainingPlanController } from './controllers/create-training-plan.controller'
import { CreateTrainingPlanUseCase } from '@/domain/training/applications/use-cases/create-training-plan'
import { CreateTrainingController } from './controllers/create-training.controller'
import { CreateTrainingUseCase } from '@/domain/training/applications/use-cases/create-training'
import { FetchTrainingPlanController } from './controllers/fetch-training-plan.controller'
import { FetchTrainingPlanUseCase } from '@/domain/training/applications/use-cases/fetch-training-plan'
import { FetchTrainingController } from './controllers/fetch-training.controller'
import { FetchTrainingUseCase } from '@/domain/training/applications/use-cases/fetch-training'
import { FetchStudentExercisesController } from './controllers/fetch-student-exercises.controller'
import { FetchTrainingExercisesUseCase } from '@/domain/training/applications/use-cases/fetch-training-exercises'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateAccountController,
    CreateExerciseController,
    EditExerciseController,
    DeleteExerciseController,
    CreateTrainingPlanController,
    CreateTrainingController,
    FetchTrainingPlanController,
    FetchTrainingController,
    FetchStudentExercisesController
  ],
  providers: [
    CreateStudentUseCase,
    AuthenticateStudentUseCase,
    CreateExerciseUseCase,
    EditExerciseUseCase,
    DeleteExerciseUseCase,
    CreateTrainingPlanUseCase,
    CreateTrainingUseCase,
    FetchTrainingPlanUseCase,
    FetchTrainingUseCase,
    FetchTrainingExercisesUseCase
  ],
})
export class HttpModule {}
