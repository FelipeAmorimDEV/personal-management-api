import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateStudentUseCase } from '@/domain/identity-management/applications/use-cases/create-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateStudentUseCase } from '@/domain/identity-management/applications/use-cases/authenticate-student'
import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { CreateExerciseUseCase } from '@/domain/training/applications/use-cases/create-exercise'
import { CreateExerciseController } from './controllers/create-exercise.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateAccountController,
    CreateExerciseController,
  ],
  providers: [
    CreateStudentUseCase,
    AuthenticateStudentUseCase,
    CreateExerciseUseCase,
  ],
})
export class HttpModule {}
