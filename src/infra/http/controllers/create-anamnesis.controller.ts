import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CreateAnamnesisUseCase } from '@/domain/progress-tracking/applications/use-cases/create-anamnesis'

const createAnamnesisBodySchema = z.object({
  fullName: z.string(),
  age: z.number(),
  hasHeartProblem: z.boolean(),
  hasChestPainDuringActivity: z.boolean(),
  hadChestPainInLastMonth: z.boolean(),
  hasBalanceProblems: z.boolean(),
  hasBoneOrJointProblem: z.boolean(),
  takesBloodPressureMedication: z.boolean(),
  hasOtherHealthIssues: z.boolean(),
})

type CreateAnamnesisBodySchema = z.infer<typeof createAnamnesisBodySchema>

const zodValidationPipe = new ZodValidationPipe(createAnamnesisBodySchema)

@Controller('anamnesis')
@UseGuards(JwtAuthGuard)
export class CreateAnamnesisController {
  constructor(private createAnamnesis: CreateAnamnesisUseCase) {}
  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateAnamnesisBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      age,
      fullName,
      hadChestPainInLastMonth,
      hasBalanceProblems,
      hasBoneOrJointProblem,
      hasChestPainDuringActivity,
      hasHeartProblem,
      hasOtherHealthIssues,
      takesBloodPressureMedication,
    } = body

    const studentId = user.sub

    await this.createAnamnesis.execute({
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
    })
  }
}
