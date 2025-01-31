import { MyProgressAnswer } from '../../enterprise/entities/my-progress-answer'

export abstract class MyProgressAnswerRepository {
  abstract create(myProgressAnswer: MyProgressAnswer): Promise<void>
}
