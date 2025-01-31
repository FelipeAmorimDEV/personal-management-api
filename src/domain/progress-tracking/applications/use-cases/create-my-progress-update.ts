import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MyProgres } from '../../enterprise/entities/my-progress'
import { Either, right } from '@/core/either'
import { MyProgressRepository } from '../repositories/my-progress-repository'
import { Injectable } from '@nestjs/common'

interface CreateMyProgressUpdateUseCaseRequest {
  studentId: string
  photo: string
  comment: string
}

type CreateMyProgressUpdateUseCaseResponse = Either<
  null,
  { myProgressUpdate: MyProgres }
>
@Injectable()
export class CreateMyProgressUpdateUseCase {
  constructor(private myProgress: MyProgressRepository) {}
  async execute({
    studentId,
    comment,
    photo,
  }: CreateMyProgressUpdateUseCaseRequest): Promise<CreateMyProgressUpdateUseCaseResponse> {
    const myProgressUpdate = MyProgres.create({
      studentId: new UniqueEntityID(studentId),
      comment,
      photo,
    })

    await this.myProgress.create(myProgressUpdate)

    return right({ myProgressUpdate })
  }
}
