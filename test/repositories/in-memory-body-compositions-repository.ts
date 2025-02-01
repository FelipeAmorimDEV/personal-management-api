import { BodyCompositionsRepository } from '@/domain/progress-tracking/applications/repositories/body-compositions-repository'
import { BodyComposition } from '@/domain/progress-tracking/enterprise/entities/body-composition'

export class InMemoryBodyCompositionsRepository extends BodyCompositionsRepository {
  public items: BodyComposition[] = []
  async fetchManyByStudentId(studentId: string) {
    const bodyCompositions = this.items.filter(
      (item) => item.studentId.toString() === studentId,
    )

    return bodyCompositions
  }

  async create(bodyComposition: BodyComposition) {
    this.items.push(bodyComposition)
  }
}
