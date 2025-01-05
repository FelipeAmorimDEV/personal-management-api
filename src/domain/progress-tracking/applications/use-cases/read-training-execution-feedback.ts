import { Either, left, right } from "@/core/either";
import { TrainingExecutionsRepository } from "../repositories/training-executions-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { TrainingExecutionFeedback } from "../../enterprise/entities/training-execution-feedback";

interface ReadTrainingExecutionFeedbackRequest {
  trainingExecutionId: string
}

type ReadTrainingExecutionFeedbackResponse = Either<ResourceNotFoundError, { trainingExecution: TrainingExecutionFeedback }>

export class ReadTrainingExecutionFeedbackUseCase {
  constructor(private trainingExecutions: TrainingExecutionsRepository) { }

  async execute({ trainingExecutionId }: ReadTrainingExecutionFeedbackRequest): Promise<ReadTrainingExecutionFeedbackResponse> {
    const trainingExecution = await this.trainingExecutions.findById(trainingExecutionId)

    if (!trainingExecution) {
      return left(new ResourceNotFoundError())
    }

    trainingExecution.readFeedback()

    await this.trainingExecutions.save(trainingExecution)

    return right({ trainingExecution })
  }
}