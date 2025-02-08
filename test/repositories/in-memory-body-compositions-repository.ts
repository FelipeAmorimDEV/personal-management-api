import { BodyCompositionsRepository } from '@/domain/progress-tracking/applications/repositories/body-compositions-repository'
import { BodyComposition } from '@/domain/progress-tracking/enterprise/entities/body-composition'

export class InMemoryBodyCompositionsRepository extends BodyCompositionsRepository {
  public items: BodyComposition[] = []

  async findById(id: string): Promise<BodyComposition | null> {
    const bodyComposition = this.items.find((item) => item.id.toString() === id)

    if (!bodyComposition) {
      return null
    }

    return bodyComposition
  }

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
