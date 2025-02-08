import { TrainingPlansRepository } from '@/domain/training/applications/repositories/training-plans-repository'
import { TrainingPlanStatus } from '@/domain/training/applications/use-cases/enums/plan-status'
import { TrainingPlan } from '@/domain/training/enterprise/entities/training-plan'

export class InMemoryTrainingPlansRepository
  implements TrainingPlansRepository
{
  public items: TrainingPlan[] = []

  async updatedExpiredPlans() {
    const now = new Date()
    this.items.forEach((item) => {
      if (item.endDate < now) {
        item.status = TrainingPlanStatus.EXPIRED
      }
    })
  }

  async findById(trainingPlanId: string) {
    const trainingPlan = this.items.find(
      (item) => item.id.toString() === trainingPlanId,
    )
    if (!trainingPlan) {
      return null
    }

    return trainingPlan
  }

  async fetchManyByStudentId(studentId: string) {
    const trainingPlans = this.items.filter(
      (item) => item.studentId.toString() === studentId,
    )
    return trainingPlans
  }

  async create(trainingPlan: TrainingPlan) {
    this.items.push(trainingPlan)
  }
}
