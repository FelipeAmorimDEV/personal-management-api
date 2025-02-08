import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Anamnesis } from '../../enterprise/entities/anamnesis'
import { Either, right } from '@/core/either'
import { AnamnesisRepository } from '../repositories/anamnesis-repository'
import { Injectable } from '@nestjs/common'

interface CreateAnamnesisUseCaseRequest {
  studentId: string
  fullName: string
  age: number
  hasHeartProblem: boolean
  hasChestPainDuringActivity: boolean
  hadChestPainInLastMonth: boolean
  hasBalanceProblems: boolean
  hasBoneOrJointProblem: boolean
  takesBloodPressureMedication: boolean
  hasOtherHealthIssues: boolean
}

type CreateAnamnesisUseCaseResponse = Either<null, { anamnesis: Anamnesis }>

@Injectable()
export class CreateAnamnesisUseCase {
  constructor(private anamnesisRepository: AnamnesisRepository) {}
  async execute({
    studentId,
    age,
    fullName,
    hadChestPainInLastMonth,
    hasBalanceProblems,
    hasBoneOrJointProblem,
    hasChestPainDuringActivity,
    hasHeartProblem,
    hasOtherHealthIssues,
    takesBloodPressureMedication,
  }: CreateAnamnesisUseCaseRequest): Promise<CreateAnamnesisUseCaseResponse> {
    const anamnesis = Anamnesis.create({
      studentId: new UniqueEntityID(studentId),
      age,
      fullName,
      hadChestPainInLastMonth,
      hasBalanceProblems,
      hasBoneOrJointProblem,
      hasChestPainDuringActivity,
      hasHeartProblem,
      hasOtherHealthIssues,
      takesBloodPressureMedication,
    })

    this.anamnesisRepository.create(anamnesis)

    return right({ anamnesis })
  }
}
