import { AnamnesisRepository } from '@/domain/progress-tracking/applications/repositories/anamnesis-repository'
import { Anamnesis } from '@/domain/progress-tracking/enterprise/entities/anamnesis'

export class InMemoryAnamnesisRepository implements AnamnesisRepository {
  public items: Anamnesis[] = []
  async findById(anamnesisId: string) {
    const anamnesis = this.items.find(
      (item) => item.id.toString() === anamnesisId,
    )

    if (!anamnesis) {
      return null
    }

    return anamnesis
  }

  async fetchManyByStudentId(studentId: string) {
    const anamnesis = this.items.filter(
      (item) => item.studentId.toString() === studentId,
    )

    return anamnesis
  }

  async create(anamnesis: Anamnesis) {
    this.items.push(anamnesis)
  }
}
