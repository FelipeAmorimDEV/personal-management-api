import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Exercise Execution (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /exercises/:id/execution', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const exercise = await prisma.exercise.create({
      data: {
        name: 'Supino Reto',
        videoUrl: 'http://youtube.com.br',
        description: 'Exercicio trabalha peito medio',
      },
    })

    const trainingPlan = await prisma.trainingPlan.create({
      data: {
        name: 'TREINO HIPERTROFIA',
        goal: 'HIPERTROFIA',
        startDate: new Date(2025, 0, 1),
        endDate: new Date(2025, 4, 1),
        strategy: 'FLEXIBLE_SESSIONS',
        studentId: student.id,
        sessionsPerWeek: 3,
      },
    })

    const training = await prisma.training.create({
      data: {
        name: 'Treino A',
        type: 'SESSION',
        trainingPlanId: trainingPlan.id,
      },
    })

    const feedback = await prisma.trainingExecutionFeedback.create({
      data: {
        studentId: student.id,
        trainingId: training.id,
        rate: 3,
        comment: 'Bom treino',
      },
    })

    await prisma.exerciseExecution.create({
      data: {
        exerciseId: exercise.id,
        studentId: student.id,
        feedbackId: feedback.id,
        weightUsed: 40,
      },
    })

    const jwtToken = await jwt.signAsync({ sub: student.id })

    const response = await request(app.getHttpServer())
      .get(`/exercises/${exercise.id}/execution?page=1`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.exerciseExecutions).toHaveLength(1)
  })
})
