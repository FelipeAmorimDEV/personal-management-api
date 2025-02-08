import { Anamnesis } from '../../enterprise/entities/anamnesis'

export abstract class AnamnesisRepository {
  abstract findById(anamnesisId: string): Promise<Anamnesis | null>
  abstract fetchManyByStudentId(studentId: string): Promise<Anamnesis[]>
  abstract create(anamnesis: Anamnesis): Promise<void>
}
