import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/identity-management/enterprise/entities/student'
import { Prisma, User as StudentPrisma } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(student: StudentPrisma) {
    return Student.create(
      {
        name: student.name,
        email: student.email,
        password: student.password,
        role: student.role,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
      new UniqueEntityID(student.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }
}
