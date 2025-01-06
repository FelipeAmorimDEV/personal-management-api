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
import { CreateTrainingExecutionFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/create-training-feedback'
import { CreateTrainingFeedbackController } from './controllers/create-training-feedback.controller'
import { ReplayTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/reply-training-feedback'
import { ReplyTrainingFeedbackController } from './controllers/reply-training-feedback.controller'
import { FetchTrainingFeedbackReplyUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-feedback-reply'
import { FetchRecentTrainingFeedbackRepliesController } from './controllers/fetch-recent-training-feedback-replies.controller'
import { FetchExerciseExecutionsUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-exercise-executions'
import { FetchExerciseExecutionController } from './controllers/fetch-exercise-execution.controller'
import { FetchTrainingFeedbackController } from './controllers/fetch-training-feedback.controller'
import { FetchTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-feedback'
import { ReadTrainingFeedbackReplyController } from './controllers/read-training-feedback-reply.controller'
import { ReadReplyTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/read-reply-training-feedback'

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
    FetchStudentExercisesController,
    CreateTrainingFeedbackController,
    ReplyTrainingFeedbackController,
    FetchRecentTrainingFeedbackRepliesController,
    FetchExerciseExecutionController,
    FetchTrainingFeedbackController,
    ReadTrainingFeedbackReplyController,
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
    FetchTrainingExercisesUseCase,
    CreateTrainingExecutionFeedbackUseCase,
    ReplayTrainingFeedbackUseCase,
    FetchTrainingFeedbackReplyUseCase,
    FetchExerciseExecutionsUseCase,
    FetchTrainingFeedbackUseCase,
    ReadReplyTrainingFeedbackUseCase,
  ],
})
export class HttpModule {}
