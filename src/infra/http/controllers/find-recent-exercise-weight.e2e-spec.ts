import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Recent Exercise Weight (E2E)', () => {
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

  test('[GET] /exercises/:id/executions', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    const access_token = jwt.sign({ sub: student.id })

    const exercise = await prisma.exercise.create({
      data: {
        name: 'Supino Reto',
        videoUrl: 'http://youtube.com',
        description: 'Exercicio trabalha peito medio',
      },
    })

    const trainingPlan = await prisma.trainingPlan.create({
      data: {
        name: 'Treino Hipertrofia',
        goal: 'Hipertrofia',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-05-01'),
        sessionsPerWeek: 3,
        trainingLevel: 'Iniciante',
        studentId: student.id,
      },
    })

    const trainingId = await prisma.training.create({
      data: {
        name: 'Treino A',
        type: 'SESSION',
        trainingPlanId: trainingPlan.id,
      },
    })

    const feedback = await prisma.trainingExecutionFeedback.create({
      data: {
        intensity: 'EXTREME',
        comment: 'o que acha do meu treino',
        studentId: student.id,
        trainingId: trainingId.id,
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

    const response = await request(app.getHttpServer())
      .get(`/exercises/${exercise.id}/executions`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.exerciseExecution).toEqual(
      expect.objectContaining({
        weightUsed: 40,
      }),
    )
  })
})
