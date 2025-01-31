import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { MyProgressAnswerRepository } from '@/domain/progress-tracking/applications/repositories/my-progress-answer-repository'
import { MyProgressAnswer } from '@/domain/progress-tracking/enterprise/entities/my-progress-answer'
import { PrismaMyProgressAnswerMapper } from '../mappers/prisma-my-progress-answer-mapper'

@Injectable()
export class PrismaMyProgressAnswerRepository
  implements MyProgressAnswerRepository
{
  constructor(private prisma: PrismaService) {}
  async create(myProgressAnswer: MyProgressAnswer) {
    const data = PrismaMyProgressAnswerMapper.toPrisma(myProgressAnswer)
    await this.prisma.myProgressAnswer.create({
      data,
    })
  }
}
