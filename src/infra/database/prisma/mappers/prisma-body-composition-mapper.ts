import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BodyComposition } from '@/domain/progress-tracking/enterprise/entities/body-composition'
import {
  Prisma,
  BodyComposition as PrismaBodyComposition,
} from '@prisma/client'

export class PrismaBodyCompositionMapper {
  static toDomain(bodyComposition: PrismaBodyComposition) {
    return BodyComposition.create(
      {
        studentId: new UniqueEntityID(bodyComposition.studentId),
        age: bodyComposition.age,
        height: bodyComposition.height,
        weight: bodyComposition.weight,
        gender: bodyComposition.gender,
        abdominal: bodyComposition.abdominal,
        bmi: bodyComposition.bmi,
        bodyDensity: bodyComposition.bodyDensity,
        bodyFatPercentage: bodyComposition.bodyFatPercentage,
        chest: bodyComposition.chest,
        fatMassKg: bodyComposition.fatMassKg,
        hip: bodyComposition.hip,
        leanMassKg: bodyComposition.leanMassKg,
        leanMassPercentage: bodyComposition.leanMassPercentage,
        methodName: bodyComposition.methodName,
        suprailiac: bodyComposition.suprailiac,
        thigh: bodyComposition.thigh,
        triceps: bodyComposition.triceps,
        waist: bodyComposition.waist,
        waistHipRatio: bodyComposition.waistHipRatio,
        createdAt: bodyComposition.createdAt,
        updatedAt: bodyComposition.updatedAt,
      },
      new UniqueEntityID(bodyComposition.id),
    )
  }

  static toPrisma(
    bodyComposition: BodyComposition,
  ): Prisma.BodyCompositionUncheckedCreateInput {
    return {
      studentId: bodyComposition.studentId.toString(),
      age: bodyComposition.age,
      height: bodyComposition.height,
      weight: bodyComposition.weight,
      gender: bodyComposition.gender,
      abdominal: bodyComposition.abdominal,
      bmi: bodyComposition.bmi,
      bodyDensity: bodyComposition.bodyDensity,
      bodyFatPercentage: bodyComposition.bodyFatPercentage,
      chest: bodyComposition.chest,
      fatMassKg: bodyComposition.fatMassKg,
      hip: bodyComposition.hip,
      leanMassKg: bodyComposition.leanMassKg,
      leanMassPercentage: bodyComposition.leanMassPercentage,
      methodName: bodyComposition.methodName,
      suprailiac: bodyComposition.suprailiac,
      thigh: bodyComposition.thigh,
      triceps: bodyComposition.triceps,
      waist: bodyComposition.waist,
      waistHipRatio: bodyComposition.waistHipRatio,
      createdAt: bodyComposition.createdAt,
      updatedAt: bodyComposition.updatedAt,
    }
  }
}
