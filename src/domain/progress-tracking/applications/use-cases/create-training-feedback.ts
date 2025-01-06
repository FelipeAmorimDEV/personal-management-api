import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'
import { Either, right } from '@/core/either'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'
import { Injectable } from '@nestjs/common'

type Exercises = {
  exerciseId: string
  weightUsed: number
}

interface CreateTrainingExecutionFeedbackRequest {
  studentId: string
  trainingId: string
  exercises: Exercises[]
  rate: number
  comment: string
}

type CreateTrainingExecutionFeedbackResponse = Either<
  null,
  { trainingFeedback: TrainingFeedback }
>

@Injectable()
export class CreateTrainingExecutionFeedbackUseCase {
  constructor(private trainingFeedbacks: TrainingFeedbacksRepository) {}
  async execute({
    trainingId,
    rate,
    comment,
    exercises,
    studentId,
  }: CreateTrainingExecutionFeedbackRequest): Promise<CreateTrainingExecutionFeedbackResponse> {
    const trainingFeedback = TrainingFeedback.create({
      trainingId: new UniqueEntityID(trainingId),
      rate,
      comment,
      studentId: new UniqueEntityID(studentId),
    })

    const exercisesFeedback = exercises.map((exercise) =>
      StudentExerciseExecution.create({
        exerciseId: new UniqueEntityID(exercise.exerciseId),
        studentId: new UniqueEntityID(studentId),
        feedbackId: trainingFeedback.id,
        weightUsed: exercise.weightUsed,
      }),
    )

    trainingFeedback.exercises = exercisesFeedback

    await this.trainingFeedbacks.create(trainingFeedback)

    return right({ trainingFeedback })
  }
}
