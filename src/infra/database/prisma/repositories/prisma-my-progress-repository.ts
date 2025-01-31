import { MyProgressRepository } from '@/domain/progress-tracking/applications/repositories/my-progress-repository'
import { MyProgres } from '@/domain/progress-tracking/enterprise/entities/my-progress'
import { PrismaService } from '../prisma.service'
import { PrismaMyProgressMapper } from '../mappers/prisma-my-progress-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaMyProgressMapperWithDetails } from '../mappers/prisma-my-progress-with-details-mapper'

@Injectable()
export class PrismaMyProgressRepository implements MyProgressRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string) {
    const myProgress = await this.prisma.myProgress.findUnique({
      where: {
        id,
      },
    })

    if (!myProgress) {
      return null
    }

    return PrismaMyProgressMapper.toDomain(myProgress)
  }

  async fetchManyByStudentId(studentId: string) {
    const myProgress = await this.prisma.myProgress.findMany({
      where: {
        studentId,
      },
      include: {
        user: true,
        myProgressAnswer: {
          include: {
            admin: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return myProgress.map(PrismaMyProgressMapperWithDetails.toDomain)
  }

  async create(myProgress: MyProgres): Promise<void> {
    const data = PrismaMyProgressMapper.toPrisma(myProgress)
    await this.prisma.myProgress.create({ data })
  }
}
