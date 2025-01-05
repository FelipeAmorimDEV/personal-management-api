import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { TrainingExecutionFeedback } from "../../enterprise/entities/training-execution-feedback"
import { Student } from "@/domain/identity-management/enterprise/entities/student"
import { StudentExerciseExecution } from "../../enterprise/entities/student-exercise-execution"
import { TrainingExecutionsRepository } from "../repositories/training-executions-repository"
import { Either, right } from "@/core/either"

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

type CreateTrainingExecutionFeedbackResponse = Either<null, { trainingExecutionFeedback: TrainingExecutionFeedback }>

export class CreateTrainingExecutionFeedbackUseCase {
  constructor(private trainingExecutions: TrainingExecutionsRepository) { }
  async execute({ trainingId, rate, comment, exercises, studentId }: CreateTrainingExecutionFeedbackRequest): Promise<CreateTrainingExecutionFeedbackResponse> {
    const trainingExecutionFeedback = TrainingExecutionFeedback.create({
      trainingId: new UniqueEntityID(trainingId),
      rate,
      comment
    })

    const exercisesFeedback = exercises.map((exercise) => StudentExerciseExecution.create({
      exerciseId: new UniqueEntityID(exercise.exerciseId),
      studentId: new UniqueEntityID(studentId),
      feedbackId: trainingExecutionFeedback.id,
      weightUsed: exercise.weightUsed
    }))

    trainingExecutionFeedback.exercises = exercisesFeedback

    await this.trainingExecutions.create(trainingExecutionFeedback)

    return right({ trainingExecutionFeedback })
  }
}