import { ExercisesRepository } from '@/domain/training/applications/repositories/exercises-repository'
import { Exercise } from '@/domain/training/enterprise/entities/exercise'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaExerciseMapper } from '../mappers/prisma-exercise-mapper'

@Injectable()
export class PrismaExercisesRepository implements ExercisesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(exerciseId: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
      include: {
        groupMuscle: true,
      },
    })

    if (!exercise) {
      return null
    }

    return PrismaExerciseMapper.toDomain(exercise)
  }

  async create(exercise: Exercise) {
    const data = PrismaExerciseMapper.toPrisma(exercise)
    await this.prisma.exercise.create({
      data,
    })
  }

  async save(exercise: Exercise) {
    const data = PrismaExerciseMapper.toPrisma(exercise)
    await this.prisma.exercise.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(exercise: Exercise) {
    const data = PrismaExerciseMapper.toPrisma(exercise)
    await this.prisma.exercise.delete({
      where: {
        id: data.id,
      },
    })
  }
}
