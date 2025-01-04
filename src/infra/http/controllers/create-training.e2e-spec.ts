import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Training (E2E)', () => {
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

  test('[POST] /trainings', async () => {
    const admin = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const jwtToken = await jwt.signAsync({ sub: admin.id })

    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    const trainingPlan = await prisma.trainingPlan.create({
      data: {
        name: 'Plano 3 meses',
        goal: 'Hipertrofia',
        sessionsPerWeek: 3,
        startDate: new Date(2025, 0, 1),
        endDate: new Date(2025, 3, 1),
        studentId: student.id,
      },
    })

    const exercise = await prisma.exercise.create({
      data: {
        name: 'Supino Reto',
        videoUrl: 'http://youtube.com',
        description: 'Exercicio trabalha peito medio',
      },
    })

    const response = await request(app.getHttpServer())
      .post('/trainings')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        trainingPlanId: trainingPlan.id,
        name: 'Treino A',
        type: 'SESSION',
        exercises: [
          {
            exerciseId: exercise.id,
            sets: 3,
            repetitions: 12,
            restTime: 120,
          },
        ],
      })

    const trainingOnDataBase = await prisma.training.findFirst({
      where: {
        name: 'Treino A',
      },
    })

    expect(response.status).toBe(201)
    expect(trainingOnDataBase).toBeTruthy()
  })
})
