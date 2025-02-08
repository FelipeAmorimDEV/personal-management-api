import { BodyComposition } from '../../enterprise/entities/body-composition'

export abstract class BodyCompositionsRepository {
  abstract findById(id: string): Promise<BodyComposition | null>
  abstract fetchManyByStudentId(studentId: string): Promise<BodyComposition[]>
  abstract create(bodyComposition: BodyComposition): Promise<void>
}
