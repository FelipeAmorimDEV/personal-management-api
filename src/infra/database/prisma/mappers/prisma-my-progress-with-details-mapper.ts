import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MyProgressWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/my-progress-with-details'
import {
  MyProgress as PrismaMyProgress,
  MyProgressAnswer as PrismaMyProgressAnswer,
  User,
} from '@prisma/client'

type MyProgressAnswer = PrismaMyProgressAnswer & {
  admin: User
}

type MyProgressType = PrismaMyProgress & {
  myProgressAnswer: MyProgressAnswer | null
  user: User
}

export class PrismaMyProgressMapperWithDetails {
  static toDomain(myProgress: MyProgressType) {
    return MyProgressWithDetails.create({
      myProgressId: new UniqueEntityID(myProgress.id),
      studentName: myProgress.user.name,
      adminName: myProgress.myProgressAnswer?.admin.name,
      adminPhoto: myProgress.myProgressAnswer?.admin.avatar,
      reply: myProgress.myProgressAnswer?.reply,
      comment: myProgress.comment,
      photo: myProgress.photo,
      createdAt: myProgress.createdAt,
      studentId: new UniqueEntityID(myProgress.studentId),
      adminId: new UniqueEntityID(myProgress.myProgressAnswer?.adminId),
    })
  }
}
