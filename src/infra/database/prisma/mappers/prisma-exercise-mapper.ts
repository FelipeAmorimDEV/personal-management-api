import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Exercise } from '@/domain/training/enterprise/entities/exercise'
import { Prisma, Exercise as PrismaExercise } from '@prisma/client'
export class PrismaExerciseMapper {
  static toDomain(exercise: PrismaExercise) {
    return Exercise.create(
      {
        name: exercise.name,
        videoUrl: exercise.videoUrl,
        description: exercise.description,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
      },
      new UniqueEntityID(exercise.id),
    )
  }

  static toPrisma(execise: Exercise): Prisma.ExerciseUncheckedCreateInput {
    return {
      id: execise.id.toString(),
      name: execise.name,
      videoUrl: execise.videoUrl,
      description: execise.description,
      createdAt: execise.createdAt,
      updatedAt: execise.updatedAt,
    }
  }
}
