import { TrainingPlan } from '@/domain/training/enterprise/entities/training-plan'

export class HttpTrainingPlanPresenter {
  static toHTTP(trainingPlan: TrainingPlan) {
    return {
      id: trainingPlan.id.toString(),
      name: trainingPlan.name,
      goal: trainingPlan.goal,
      trainingLevel: trainingPlan.trainingLevel,
      sessionsPerWeek: trainingPlan.sessionsPerWeek,
      strategy: trainingPlan.strategy,
      startDate: trainingPlan.startDate,
      endDate: trainingPlan.endDate,
      studentId: trainingPlan.studentId.toString(),
      createdAt: trainingPlan.createdAt,
      updatedAt: trainingPlan.updatedAt,
    }
  }
}
