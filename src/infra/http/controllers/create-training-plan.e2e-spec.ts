import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Training Plan (E2E)', () => {
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

  test('[POST] /training-plans', async () => {
    const admin = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    const jwtToken = await jwt.signAsync({ sub: admin.id })

    const response = await request(app.getHttpServer())
      .post('/training-plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        studentId: student.id,
        name: 'Novo Treino',
        goal: 'Hipertrofia',
        sessionsPerWeek: 3,
        strategy: 'FLEXIBLE_SESSIONS',
        startDate: '2025-01-01',
        endDate: '2024-04-01',
        trainingLevel: 'INICIANTE',
      })

    const trainingPlanOnDataBase = await prisma.trainingPlan.findFirst({
      where: {
        name: 'Novo Treino',
      },
    })

    expect(response.status).toBe(201)
    expect(trainingPlanOnDataBase).toBeTruthy()
  })
})
