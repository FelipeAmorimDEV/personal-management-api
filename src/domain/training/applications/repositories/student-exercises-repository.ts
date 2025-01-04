import { StudentExercise } from "../../enterprise/entities/student-exercise";


export abstract class StudentExercisesRepository {
  abstract fetchManyByTrainingId(trainingId: string): Promise<StudentExercise[]>
  abstract create(StudentExercise: StudentExercise): Promise<void>
}
