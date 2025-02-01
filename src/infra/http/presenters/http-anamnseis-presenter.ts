import { Anamnesis } from '@/domain/progress-tracking/enterprise/entities/anamnesis'

export class HttpAnamnesisPresenter {
  static toHTTP(anamnesis: Anamnesis) {
    return {
      id: anamnesis.id.toString(),
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
