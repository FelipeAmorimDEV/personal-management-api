import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { PrismaService } from '../database/prisma/prisma.service'
import { UpdateExpiredPlansJob } from './updated-expired-plans.job'
import { TrainingPlanStatus } from '@/domain/training/applications/use-cases/enums/plan-status'
import { AppModule } from '../app.module'

describe('UpdateExpiredPlansJob (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let job: UpdateExpiredPlansJob

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    vi.useFakeTimers()

    app = moduleRef.createNestApplication()
    await app.init()

    prisma = moduleRef.get<PrismaService>(PrismaService)
    job = moduleRef.get<UpdateExpiredPlansJob>(UpdateExpiredPlansJob)
  })

  afterAll(async () => {
    vi.useRealTimers()
    await prisma.$disconnect()
    await app.close()
  })

  it('should update the training plan status to canceled', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        role: 'STUDENT',
      },
    })
    // 🔹 1. Criar um plano de treino com data de expiração para hoje
    const plan = await prisma.trainingPlan.create({
      data: {
        name: 'Treino de teste',
        sessionsPerWeek: 3,
        trainingLevel: 'BEGINNER',
        goal: 'Hipertrogia',
        startDate: new Date(),
        endDate: new Date(),
        status: TrainingPlanStatus.ACTIVE,
        studentId: student.id,
      },
    })

    // 🔹 2. Simular passagem de tempo para um dia depois (meia-noite)
    vi.setSystemTime(new Date(Date.now() + 24 * 60 * 60 * 1000))
    await job.handleCron()

    const updatedPlan = await prisma.trainingPlan.findUnique({
      where: { id: plan.id },
    })

    // 🔹 5. Verificar se o status foi atualizado corretamente
    expect(updatedPlan!.status).toBe('EXPIRED')
  })
})
