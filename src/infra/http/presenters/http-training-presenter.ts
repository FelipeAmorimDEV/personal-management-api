import { Training } from '@/domain/training/enterprise/entities/training'

export class HttpTrainingPresenter {
  static toHTTP(training: Training) {
    return {
      id: training.id.toString(),
      name: training.name,
      type: training.type,
      dayOfWeek: training.dayOfWeek,
      trainingPlanId: training.trainingPlanId.toString(),
      createdAt: training.createdAt,
      updatedAt: training.updatedAt,
      groupMuscle: training.groupMuscle.map((group) => ({
        id: group.id.toString(),
        name: group.name,
      })),
    }
  }
}
