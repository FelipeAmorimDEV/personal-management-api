import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MyProgres } from '@/domain/progress-tracking/enterprise/entities/my-progress'
import { MyProgress as PrismaMyProgress, Prisma } from '@prisma/client'

export class PrismaMyProgressMapper {
  static toDomain(myProgress: PrismaMyProgress) {
    return MyProgres.create({
      studentId: new UniqueEntityID(myProgress.studentId),
      comment: myProgress.comment,
      photo: myProgress.photo,
      createdAt: myProgress.createdAt,
    })
  }

  static toPrisma(
    myProgress: MyProgres,
  ): Prisma.MyProgressUncheckedCreateInput {
    return {
      id: myProgress.id.toString(),
      studentId: myProgress.studentId.toString(),
      comment: myProgress.comment,
      photo: myProgress.photo,
      createdAt: myProgress.createdAt,
    }
  }
}
