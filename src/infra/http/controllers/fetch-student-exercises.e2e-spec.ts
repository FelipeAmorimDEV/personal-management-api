import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Student Exercises (E2E)', () => {
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

  test('[GET] /trainings/exercises', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    const access_token = jwt.sign({ sub: student.id })

    const trainingPlan = await prisma.trainingPlan.create({
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

    const training = await prisma.training.create({
      data: {
        name: 'TREINO A',
        type: 'SESSION',
        trainingPlanId: trainingPlan.id,
      },
    })

    const exercise = await prisma.exercise.create({
      data: {
        name: 'Supino Reto',
        videoUrl: 'http://youtube.com',
        description: 'Peito medio',
      },
    })

    await prisma.studentExercise.create({
      data: {
        exerciseId: exercise.id,
        trainingId: training.id,
        sets: 3,
        repetitions: 12,
        restTime: 120,
      },
    })

    const response = await request(app.getHttpServer())
      .get(`/trainings/exercises?trainingId=${training.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.exercises).toHaveLength(1)
  })
})
