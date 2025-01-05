import { TrainingExecutionFeedback } from "../../enterprise/entities/training-execution-feedback";
export abstract class TrainingExecutionsRepository {
  abstract findById(id: string): Promise<TrainingExecutionFeedback | null>
  abstract create(trainingExecution: TrainingExecutionFeedback): Promise<void>
  abstract save(trainingExecution: TrainingExecutionFeedback): Promise<void>
}