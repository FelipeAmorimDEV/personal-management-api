import { PaginationParams } from "@/core/types/pagination-params";
import { StudentExerciseExecution } from "../../enterprise/entities/student-exercise-execution";

export abstract class ExerciseExecutionsRepository {
  abstract fetchManyByUserIdAndExerciseId(userId: string, exerciseId: string, params: PaginationParams): Promise<StudentExerciseExecution[]>
  abstract create(exerciseExecution: StudentExerciseExecution): Promise<void>
}