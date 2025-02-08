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
import { FetchExerciseExecutionsUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-exercise-executions'
import { FetchExerciseExecutionController } from './controllers/fetch-exercise-execution.controller'
import { FetchTrainingFeedbackController } from './controllers/fetch-training-feedback.controller'
import { FetchTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-feedback'
import { ReadTrainingFeedbackReplyController } from './controllers/read-training-feedback-reply.controller'
import { ReadReplyTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/read-reply-training-feedback'
import { FetchRecentTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-recent-training-feedback-user'
import { FetchRecentTrainingFeedbackController } from './controllers/fetch-training-feedback-user.controller'
import { FetchExerciseExecutionByUserUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-exercise-execution-by-user'
import { FetchExerciseExecutionByUserController } from './controllers/fetch-exercise-execution-by-user.controller'
import { FetchTrainingFrequencyController } from './controllers/fetch-training-frequency.controller'
import { FetchTrainingFrequencyUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-frequency'
import { FindRecentExerciseWeightController } from './controllers/find-recent-exercise-weight.controller'
import { FindRecentWeightUseCase } from '@/domain/progress-tracking/applications/use-cases/find-recent-weight'
import { GetStudentProfileController } from './controllers/get-student-profile.controller'
import { GetStudentProfileUseCase } from '@/domain/identity-management/applications/use-cases/get-student-profile'
import { EditStudentController } from './controllers/edit-student.controller'
import { EditStudentUseCase } from '@/domain/identity-management/applications/use-cases/edit-student'
import { UploadAvatarController } from './controllers/upload-avatar.controller'
import { UploadAvatarUseCase } from '@/domain/identity-management/applications/use-cases/upload-avatar'
import { UploadMyProgressPhotoController } from './controllers/upload-my-progress-photo.controller'
import { CreateMyProgressUpdateController } from './controllers/create-my-progress-update.controller'
import { CreateMyProgressUpdateUseCase } from '@/domain/progress-tracking/applications/use-cases/create-my-progress-update'
import { FetchMyProgressUpdateController } from './controllers/fetch-my-progress-update.controller'
import { FetchMyProgressUpdateUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-my-progress-update'
import { CreateMyProgressAnswerController } from './controllers/create-my-progress-answer.controller'
import { CreateMyProgressAnswerUseCase } from '@/domain/progress-tracking/applications/use-cases/create-my-progress-answer'
import { CreateBodyCompositionController } from './controllers/create-body-composition.controller'
import { CreateBodyCompositionPollock3UseCase } from '@/domain/progress-tracking/applications/use-cases/create-body-composition-pullock-3'
import { FetchBodyCompositionController } from './controllers/fetch-body-composition.controller'
import { FetchBodyCompositionUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-body-composition'
import { CreateAnamnesisController } from './controllers/create-anamnesis.controller'
import { CreateAnamnesisUseCase } from '@/domain/progress-tracking/applications/use-cases/create-anamnesis'
import { FetchAnamnesisController } from './controllers/fetch-anamnesis.controller'
import { FetchAnamnesisUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-anamnesis'
import { FindBodyCompositionController } from './controllers/find-body-composition.controller'
import { FindBodyCompositionUseCase } from '@/domain/progress-tracking/applications/use-cases/find-body-composition'
import { UpdateExpiredPlansJob } from '../jobs/updated-expired-plans.job'
import { UpdateExpiredPlansUseCase } from '@/domain/training/applications/use-cases/update-expired-plans'
import { JobsModule } from '../jobs/jobs.module'
import { CreatePaymentController } from './controllers/create-payment.controller'
import { CreatePaymentUseCase } from '@/domain/payments/applications/use-cases/create-payment'
import { FetchPaymentsController } from './controllers/fetch-payments.controller'
import { FetchPaymentsUseCase } from '@/domain/payments/applications/use-cases/fetch-payments'
import { FindPaymentController } from './controllers/find-payment.controller'
import { FindPaymentUseCase } from '@/domain/payments/applications/use-cases/find-payment'
import { FetchPaymentDueController } from './controllers/fetch-payment-due.controller'
import { FetchPaymentDueUseCase } from '@/domain/payments/applications/use-cases/fetch-payment-due'
import { FindAnamnesisController } from './controllers/find-anamnesis.controller'
import { FindAnamnesisUseCase } from '@/domain/progress-tracking/applications/use-cases/find-anamnesis'

@Module({
  imports: [DatabaseModule, CryptographyModule, JobsModule],
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
    FetchExerciseExecutionController,
    FetchTrainingFeedbackController,
    ReadTrainingFeedbackReplyController,
    FetchRecentTrainingFeedbackController,
    FetchExerciseExecutionByUserController,
    FetchTrainingFrequencyController,
    FindRecentExerciseWeightController,
    GetStudentProfileController,
    EditStudentController,
    UploadAvatarController,
    UploadMyProgressPhotoController,
    CreateMyProgressUpdateController,
    FetchMyProgressUpdateController,
    CreateMyProgressAnswerController,
    CreateBodyCompositionController,
    FetchBodyCompositionController,
    CreateAnamnesisController,
    FetchAnamnesisController,
    FindBodyCompositionController,
    CreatePaymentController,
    FetchPaymentsController,
    FindPaymentController,
    FetchPaymentDueController,
    FindAnamnesisController,
  ],
  providers: [
    UpdateExpiredPlansJob,
    UpdateExpiredPlansUseCase,
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
    FetchExerciseExecutionsUseCase,
    FetchTrainingFeedbackUseCase,
    ReadReplyTrainingFeedbackUseCase,
    FetchRecentTrainingFeedbackUseCase,
    FetchExerciseExecutionByUserUseCase,
    FetchTrainingFrequencyUseCase,
    FindRecentWeightUseCase,
    GetStudentProfileUseCase,
    EditStudentUseCase,
    UploadAvatarUseCase,
    CreateMyProgressUpdateUseCase,
    FetchMyProgressUpdateUseCase,
    CreateMyProgressAnswerUseCase,
    CreateBodyCompositionPollock3UseCase,
    FetchBodyCompositionUseCase,
    CreateAnamnesisUseCase,
    FetchAnamnesisUseCase,
    FindBodyCompositionUseCase,
    CreatePaymentUseCase,
    FetchPaymentsUseCase,
    FindPaymentUseCase,
    FetchPaymentDueUseCase,
    FindAnamnesisUseCase,
  ],
})
export class HttpModule {}
