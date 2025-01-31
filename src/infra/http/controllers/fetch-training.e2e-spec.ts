import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Training (E2E)', () => {
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

    const training = await prisma.trainingPlan.create({
      data: {
        name: 'Treino 1',
        goal: 'Hipertrofia',
        sessionsPerWeek: 3,
        strategy: 'FLEXIBLE_SESSIONS',
        startDate: new Date(2025, 0, 1),
        endDate: new Date(2025, 3, 1),
        studentId: student.id,
        trainingLevel: 'INICIANTE',
      },
    })

    await prisma.training.create({
      data: {
        name: 'TREINO A',
        type: 'SESSION',
        trainingPlanId: training.id,
      },
    })

    const response = await request(app.getHttpServer())
      .get(`/trainings?trainingPlanId=${training.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.training).toHaveLength(1)
  })
})
