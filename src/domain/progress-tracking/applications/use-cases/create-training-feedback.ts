import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'
import { Either, right } from '@/core/either'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'
import { Injectable } from '@nestjs/common'
import { IntensityLevel } from './enums/intensity-level'
import { AchievementType, UnlockAchievementUseCase } from './unlock-achievement'
import { ExerciseExecutionsRepository } from '../repositories/exercise-executions-repository'

type Exercises = {
  exerciseId: string
  weightUsed: number
}

type FinishedExercises = {
  id: string
  sets: number
  repetitions: number
}

interface CreateTrainingExecutionFeedbackRequest {
  studentId: string
  trainingId: string
  exercises: Exercises[]
  finishedExercises: FinishedExercises[]
  intensity: IntensityLevel
  comment: string
}

type CreateTrainingExecutionFeedbackResponse = Either<
  null,
  { trainingFeedback: TrainingFeedback }
>

@Injectable()
export class CreateTrainingExecutionFeedbackUseCase {
  constructor(
    private trainingFeedbacks: TrainingFeedbacksRepository,
    private unlockAchievement: UnlockAchievementUseCase,
    private exerciseExecutions: ExerciseExecutionsRepository,
  ) {}

  async execute({
    trainingId,
    intensity,
    comment,
    exercises,
    studentId,
    finishedExercises,
  }: CreateTrainingExecutionFeedbackRequest): Promise<CreateTrainingExecutionFeedbackResponse> {
    // Criar o feedback do treino
    const trainingFeedback = this.createTrainingFeedback(
      studentId,
      trainingId,
      intensity,
      comment,
    )

    // Criar os registros de execução de exercícios (se houver)
    const exercisesFeedback = this.createExercisesExecutions(
      exercises,
      studentId,
      trainingFeedback.id,
    )

    trainingFeedback.exercises = exercisesFeedback

    // Salvar feedback do treino
    await this.trainingFeedbacks.create(trainingFeedback)

    // Calcular e atualizar total de peso levantado
    const totalWeightLiftedInTraining = await this.calculateTotalWeightLifted(
      finishedExercises,
      studentId,
    )

    const totalWeightLifted = await this.updateAndGetTotalWeightLifted(
      studentId,
      totalWeightLiftedInTraining,
    )

    // Atualizar progresso e desbloquear achievements
    const progressValue =
      await this.trainingFeedbacks.getTrainingCount(studentId)

    await this.unlockAchievements(studentId, progressValue, totalWeightLifted)

    return right({ trainingFeedback })
  }

  /**
   * Cria um novo feedback de treino.
   */
  private createTrainingFeedback(
    studentId: string,
    trainingId: string,
    intensity: IntensityLevel,
    comment: string,
  ): TrainingFeedback {
    return TrainingFeedback.create({
      trainingId: new UniqueEntityID(trainingId),
      intensity,
      comment,
      studentId: new UniqueEntityID(studentId),
    })
  }

  /**
   * Cria os registros de execução de exercícios, caso existam.
   */
  private createExercisesExecutions(
    exercises: Exercises[],
    studentId: string,
    feedbackId: UniqueEntityID,
  ): StudentExerciseExecution[] {
    return exercises.map((exercise) => {
      return StudentExerciseExecution.create({
        exerciseId: new UniqueEntityID(exercise.exerciseId),
        studentId: new UniqueEntityID(studentId),
        feedbackId,
        weightUsed: exercise.weightUsed,
      })
    })
  }

  /**
   * Calcula o total de peso levantado no treino.
   */
  private async calculateTotalWeightLifted(
    exercises: FinishedExercises[],
    studentId: string,
  ): Promise<number> {
    let totalWeightLifted = 0

    for (const exercise of exercises) {
      const execution = await this.exerciseExecutions.findByUserIdAndExerciseId(
        studentId,
        exercise.id,
      )

      if (execution) {
        totalWeightLifted +=
          execution.weightUsed * exercise.sets * exercise.repetitions
      }
    }

    return totalWeightLifted
  }

  /**
   * Atualiza e retorna o total de peso levantado pelo aluno.
   */
  private async updateAndGetTotalWeightLifted(
    studentId: string,
    totalWeightLiftedInTraining: number,
  ): Promise<number> {
    const currentTotalWeight =
      await this.trainingFeedbacks.getTotalWeightLifted(studentId)

    const newTotalWeight = currentTotalWeight + totalWeightLiftedInTraining

    await this.trainingFeedbacks.updateTotalWeightLifted(
      studentId,
      newTotalWeight,
    )

    return newTotalWeight
  }

  /**
   * Executa a liberação dos achievements com base nos valores atualizados.
   */
  private async unlockAchievements(
    studentId: string,
    progressValue: number,
    totalWeightLifted: number,
  ) {
    await Promise.all([
      this.unlockAchievement.execute({
        studentId,
        achievementType: AchievementType.TRAINING_COMPLETED,
        progressValue,
      }),
      this.unlockAchievement.execute({
        studentId,
        achievementType: AchievementType.FEEDBACK_GIVEN,
        progressValue,
      }),
      this.unlockAchievement.execute({
        studentId,
        achievementType: AchievementType.WEIGHT_LIFTED,
        progressValue: totalWeightLifted,
      }),
    ])
  }
}
