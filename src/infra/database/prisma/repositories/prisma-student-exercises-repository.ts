import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StudentExercisesRepository } from '@/domain/training/applications/repositories/student-exercises-repository'
import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'
import { PrismaStudentExerciseMapper } from '../mappers/prisma-student-exercise-mapper'
import { PrismaStudentExerciseWithDetailsMapper } from '../mappers/prisma-student-exercise-with-details-mapper'

@Injectable()
export class PrismaStudentExercisesRepository
  implements StudentExercisesRepository
{
  constructor(private prisma: PrismaService) {}
  async fetchManyByTrainingId(trainingId: string) {
    const studentExercises = await this.prisma.studentExercise.findMany({
      where: {
        trainingId,
      },
      include: {
        exercise: true,
      },
    })

    return studentExercises.map(PrismaStudentExerciseWithDetailsMapper.toDomain)
  }

  async create(StudentExercise: StudentExercise) {
    const data = PrismaStudentExerciseMapper.toPrisma(StudentExercise)
    await this.prisma.studentExercise.create({
      data,
    })
  }
}
