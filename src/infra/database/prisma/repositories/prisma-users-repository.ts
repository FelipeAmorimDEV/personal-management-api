import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'
import { Admin } from '@/domain/identity-management/enterprise/entities/admin'
import { Student } from '@/domain/identity-management/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaStudentMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaStudentMapper.toDomain(user)
  }

  async create(user: Student | Admin) {
    const data = PrismaStudentMapper.toPrisma(user)
    await this.prisma.user.create({
      data,
    })
  }

  async save(user: Student | Admin) {
    const data = PrismaStudentMapper.toPrisma(user)
    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(user: Student | Admin) {
    const data = PrismaStudentMapper.toPrisma(user)
    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }
}
