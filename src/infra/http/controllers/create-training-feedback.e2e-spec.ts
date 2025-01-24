import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Training Feedback (E2E)', () => {
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

  test('[POST] /trainings/feedback', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    const exercise = await prisma.exercise.create({
      data: {
        name: 'Supino Reto',
        videoUrl: 'http://youtube.com',
        description: 'Trabalha peito medio',
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

    const jwtToken = await jwt.signAsync({ sub: student.id })

    const response = await request(app.getHttpServer())
      .post('/trainings/feedback')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        trainingId: training.id,
        rate: 3,
        comment: 'Bom Treino',
        exercises: [
          {
            exerciseId: exercise.id,
            weightUsed: 30,
          },
        ],
      })

    const trainingFeedbackOnDataBase =
      await prisma.trainingExecutionFeedback.findFirst({
        where: {
          comment: 'Bom Treino',
        },
      })

    expect(response.status).toBe(201)
    expect(trainingFeedbackOnDataBase).toBeTruthy()
  })
})
