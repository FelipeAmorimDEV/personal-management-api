import { MyProgressAnswer } from '@/domain/progress-tracking/enterprise/entities/my-progress-answer'
import { Prisma } from '@prisma/client'

export class PrismaMyProgressAnswerMapper {
  static toPrisma(
    myProgress: MyProgressAnswer,
  ): Prisma.MyProgressAnswerUncheckedCreateInput {
    return {
      id: myProgress.id.toString(),
      myProgressId: myProgress.progressId.toString(),
      adminId: myProgress.adminId.toString(),
      reply: myProgress.reply,
    }
  }
}
