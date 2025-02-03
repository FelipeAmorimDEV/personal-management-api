import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Find Body Composition (E2E)', () => {
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

  test('[GET] /body-composition/:id', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const bodyComposition = await prisma.bodyComposition.create({
      data: {
        studentId: user.id,
        height: 163,
        weight: 80,
        age: 29,
        gender: 'MALE',
        abdominal: 90,
        chest: 120,
        hip: 70,
        waist: 100,
        suprailiac: 80,
        thigh: 60,
        triceps: 22,
        bmi: 1,
        bodyDensity: 2,
        bodyFatPercentage: 3,
        fatMassKg: 3,
        leanMassKg: 3,
        leanMassPercentage: 3,
        methodName: 'Pollock 3 Dobras',
        waistHipRatio: 1,
        createdAt: new Date(),
      },
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get(`/body-composition/${bodyComposition.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.bodyComposition).toEqual(
      expect.objectContaining({
        methodName: 'Pollock 3 Dobras',
      }),
    )
  })
})
