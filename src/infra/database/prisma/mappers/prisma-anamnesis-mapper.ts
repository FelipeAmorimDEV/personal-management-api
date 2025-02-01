import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Anamnesis } from '@/domain/progress-tracking/enterprise/entities/anamnesis'
import { Prisma, Anamnesis as PrismaAnamnesis } from '@prisma/client'

export class PrismaAnamnesisMapper {
  static toDomain(anamnesis: PrismaAnamnesis) {
    return Anamnesis.create(
      {
        studentId: new UniqueEntityID(anamnesis.studentId),
        fullName: anamnesis.fullName,
        age: anamnesis.age,
        hadChestPainInLastMonth: anamnesis.hadChestPainInLastMonth,
        hasBalanceProblems: anamnesis.hasBalanceProblems,
        hasBoneOrJointProblem: anamnesis.hasBoneOrJointProblem,
        hasChestPainDuringActivity: anamnesis.hasChestPainDuringActivity,
        hasHeartProblem: anamnesis.hasHeartProblem,
        hasOtherHealthIssues: anamnesis.hasOtherHealthIssues,
        takesBloodPressureMedication: anamnesis.takesBloodPressureMedication,
        createdAt: anamnesis.createdAt,
        updatedAt: anamnesis.updatedAt,
      },
      new UniqueEntityID(anamnesis.id),
    )
  }

  static toPrisma(anamnesis: Anamnesis): Prisma.AnamnesisUncheckedCreateInput {
    return {
      studentId: anamnesis.studentId.toString(),
      fullName: anamnesis.fullName,
      age: anamnesis.age,
      hadChestPainInLastMonth: anamnesis.hadChestPainInLastMonth,
      hasBalanceProblems: anamnesis.hasBalanceProblems,
      hasBoneOrJointProblem: anamnesis.hasBoneOrJointProblem,
      hasChestPainDuringActivity: anamnesis.hasChestPainDuringActivity,
      hasHeartProblem: anamnesis.hasHeartProblem,
      hasOtherHealthIssues: anamnesis.hasOtherHealthIssues,
      takesBloodPressureMedication: anamnesis.takesBloodPressureMedication,
      createdAt: anamnesis.createdAt,
      updatedAt: anamnesis.updatedAt,
    }
  }
}
