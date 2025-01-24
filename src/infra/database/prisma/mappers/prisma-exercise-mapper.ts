import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupMuscle } from '@/domain/training/applications/use-cases/create-training'
import { Exercise } from '@/domain/training/enterprise/entities/exercise'
import { Prisma, Exercise as PrismaExercises } from '@prisma/client'

type PrismaExercise = PrismaExercises & {
  groupMuscle: GroupMuscle[]
}

export class PrismaExerciseMapper {
  static toDomain(exercise: PrismaExercise) {
    return Exercise.create(
      {
        name: exercise.name,
        videoUrl: exercise.videoUrl,
        description: exercise.description,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
        groupMuscle: exercise.groupMuscle,
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
      groupMuscle: {
        connect: execise.groupMuscle.map((group) => ({
          id: group.id,
          name: group.name,
        })),
      },
    }
  }
}
