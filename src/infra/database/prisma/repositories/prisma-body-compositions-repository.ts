import { BodyCompositionsRepository } from '@/domain/progress-tracking/applications/repositories/body-compositions-repository'
import { BodyComposition } from '@/domain/progress-tracking/enterprise/entities/body-composition'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaBodyCompositionMapper } from '../mappers/prisma-body-composition-mapper'

@Injectable()
export class PrismaBodyCompositionsRepository
  implements BodyCompositionsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const bodyComposition = await this.prisma.bodyComposition.findUnique({
      where: {
        id,
      },
    })

    if (!bodyComposition) {
      return null
    }

    return PrismaBodyCompositionMapper.toDomain(bodyComposition)
  }

  async fetchManyByStudentId(studentId: string) {
    const bodyCompositions = await this.prisma.bodyComposition.findMany({
      where: {
        studentId,
      },
    })

    return bodyCompositions.map(PrismaBodyCompositionMapper.toDomain)
  }

  async create(bodyComposition: BodyComposition) {
    const data = PrismaBodyCompositionMapper.toPrisma(bodyComposition)
    await this.prisma.bodyComposition.create({
      data,
    })
  }
}
