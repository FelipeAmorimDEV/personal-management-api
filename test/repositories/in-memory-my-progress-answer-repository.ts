import { MyProgressAnswerRepository } from '@/domain/progress-tracking/applications/repositories/my-progress-answer-repository'
import { MyProgressAnswer } from '@/domain/progress-tracking/enterprise/entities/my-progress-answer'

export class InMemoryMyProgressAnswerRepository
  implements MyProgressAnswerRepository
{
  public items: MyProgressAnswer[] = []

  async create(myProgressAnswer: MyProgressAnswer) {
    this.items.push(myProgressAnswer)
  }
}
