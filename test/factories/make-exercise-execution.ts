import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  StudentExerciseExecution,
  StudentExerciseExecutionProps,
} from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'

export function makeExerciseExecution(
  override: Partial<StudentExerciseExecutionProps>,
  id?: UniqueEntityID,
) {
  const exerciseExecution = StudentExerciseExecution.create(
    {
      studentId: new UniqueEntityID('student-1'),
      exerciseId: new UniqueEntityID('exercise-1'),
      feedbackId: new UniqueEntityID('feedback-1'),
      weightUsed: 20,
      ...override,
    },
    id,
  )

  return exerciseExecution
}
