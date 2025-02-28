import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { FetchRecentTrainingFeedbackUseCase } from './fetch-recent-training-feedback-user'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeStudent } from 'test/factories/make-student'
import { makeTraining } from 'test/factories/make-training'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: FetchRecentTrainingFeedbackUseCase

describe('Fetch Training Feedback User', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    inMemoryStudentExercisesRepository = new InMemoryStudentExercisesRepository(
      inMemoryExercisesRepository,
    )
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTrainingsRepository = new InMemoryTrainingsRepository()
    inMemoryTrainingFeedbacksRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryReplyTrainingFeedbackRepository,
        inMemoryUsersRepository,
        inMemoryTrainingsRepository,
        inMemoryStudentExercisesRepository,
      )

    sut = new FetchRecentTrainingFeedbackUseCase(
      inMemoryTrainingFeedbacksRepository,
    )
  })

  it('should be able to fetch recent training feedbacks by user', async () => {
    const student = makeStudent({})
    const training = makeTraining({})
    const feedback = makeTrainingFeedback({
      studentId: student.id,
      trainingId: training.id,
    })
    inMemoryTrainingsRepository.create(training)
    inMemoryUsersRepository.create(student)
    inMemoryTrainingFeedbacksRepository.create(feedback)

    const feedbackAnswer = TrainingFeedbackReply.create({
      trainingFeedbackId: feedback.id,
      reply: 'Boa garoto',
    })
    inMemoryReplyTrainingFeedbackRepository.create(feedbackAnswer)

    const result = await sut.execute({ userId: student.id.toString() })

    if (result.isRight()) {
      expect(result.value.trainingFeedbacks).toHaveLength(1)
      expect(result.value.trainingFeedbacks[0].personalAnswer).toEqual(
        feedbackAnswer.reply,
      )
    }
  })
})
