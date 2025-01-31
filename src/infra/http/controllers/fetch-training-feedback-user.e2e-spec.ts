import { IntensityLevel } from '@/domain/progress-tracking/applications/use-cases/enums/intensity-level'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Training Feedback User (E2E)', () => {
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

  test('[GET] /trainings/feedback/user', async () => {
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

    await prisma.trainingExecutionFeedback.create({
      data: {
        intensity: IntensityLevel.HIGH,
        comment: 'Achei facil',
        studentId: student.id,
        trainingId: training.id,
      },
    })

    const jwtToken = await jwt.signAsync({ sub: student.id })

    const response = await request(app.getHttpServer())
      .get('/trainings/feedback/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.trainingFeedbacks).toHaveLength(1)
  })
})
