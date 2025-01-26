import { IntensityLevel } from '@/domain/progress-tracking/applications/use-cases/enums/intensity-level'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Reply Training Feedback (E2E)', () => {
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

  test('[GET] /trainings/feedback/:id/reply', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
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
        trainingLevel: 'INICIANTE',
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
        intensity: IntensityLevel.HIGH,
        comment: 'Bom treino',
      },
    })

    const jwtToken = await jwt.signAsync({ sub: student.id })

    const response = await request(app.getHttpServer())
      .post(`/trainings/feedback/${feedback.id}/reply`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        reply: 'Continue assim.',
      })

    const feedbackReplyOnDatabase =
      await prisma.trainingFeedbackReply.findFirst({
        where: {
          reply: 'Continue assim.',
        },
      })

    expect(response.status).toBe(201)
    expect(feedbackReplyOnDatabase).toBeTruthy()
  })
})
