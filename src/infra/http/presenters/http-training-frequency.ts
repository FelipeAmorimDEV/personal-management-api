import { TrainingFrequency } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'

export class HttpTrainingFrequencyPresenter {
  static toHTTP(trainingFrequency: TrainingFrequency) {
    return {
      day: trainingFrequency.day,
      isTrained: trainingFrequency.isTraining,
      isInvalid: trainingFrequency.isInvalid,
    }
  }
}
