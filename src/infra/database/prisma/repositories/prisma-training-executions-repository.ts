import { TrainingExecutionsRepository } from "@/domain/progress-tracking/applications/repositories/training-executions-repository";
import { TrainingExecutionFeedback } from "@/domain/progress-tracking/enterprise/entities/training-execution-feedback";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaTrainingExecutionsRepository implements TrainingExecutionsRepository {
  constructor(private prisma: PrismaService) { }
  async create(trainingExecution: TrainingExecutionFeedback): Promise<void> {
    const data = 
  }

}