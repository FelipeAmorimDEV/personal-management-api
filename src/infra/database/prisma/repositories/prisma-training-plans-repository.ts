import { TrainingPlansRepository } from '@/domain/training/applications/repositories/training-plans-repository'
import { TrainingPlan } from '@/domain/training/enterprise/entities/training-plan'
import { PrismaService } from '../prisma.service'
import { PrismaTrainingPlanMapper } from '../mappers/prisma-training-plan-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaTrainingPlansRepository implements TrainingPlansRepository {
  constructor(private prisma: PrismaService) {}

  async findById(trainingPlanId: string): Promise<TrainingPlan | null> {
    const trainingPlan = await this.prisma.trainingPlan.findUnique({
      where: {
        id: trainingPlanId,
      },
    })

    if (!trainingPlan) {
      return null
    }

    return PrismaTrainingPlanMapper.toDomain(trainingPlan)
  }

  async fetchManyByStudentId(studentId: string): Promise<TrainingPlan[]> {
    const trainingPlans = await this.prisma.trainingPlan.findMany({
      where: {
        studentId,
      },
    })

    return trainingPlans.map(PrismaTrainingPlanMapper.toDomain)
  }

  async create(trainingPlan: TrainingPlan): Promise<void> {
    const data = PrismaTrainingPlanMapper.toPrisma(trainingPlan)

    await this.prisma.trainingPlan.create({
      data,
    })
  }
}
