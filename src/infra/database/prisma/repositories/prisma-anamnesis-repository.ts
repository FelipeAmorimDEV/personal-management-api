import { AnamnesisRepository } from '@/domain/progress-tracking/applications/repositories/anamnesis-repository'
import { Anamnesis } from '@/domain/progress-tracking/enterprise/entities/anamnesis'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnamnesisMapper } from '../mappers/prisma-anamnesis-mapper'

@Injectable()
export class PrismaAnamnesisRepository implements AnamnesisRepository {
  constructor(private prisma: PrismaService) {}
  async fetchManyByStudentId(studentId: string) {
    const anamnesis = await this.prisma.anamnesis.findMany({
      where: {
        studentId,
      },
    })

    return anamnesis.map(PrismaAnamnesisMapper.toDomain)
  }

  async create(anamnesis: Anamnesis) {
    const data = PrismaAnamnesisMapper.toPrisma(anamnesis)
    await this.prisma.anamnesis.create({
      data,
    })
  }
}
