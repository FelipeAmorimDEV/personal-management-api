import { MyProgres } from '../../enterprise/entities/my-progress'
import { MyProgressWithDetails } from '../../enterprise/entities/value-objects/my-progress-with-details'

export abstract class MyProgressRepository {
  abstract findById(id: string): Promise<MyProgres | null>
  abstract fetchManyByStudentId(
    studentId: string,
  ): Promise<MyProgressWithDetails[]>

  abstract create(myProgress: MyProgres): Promise<void>
}
