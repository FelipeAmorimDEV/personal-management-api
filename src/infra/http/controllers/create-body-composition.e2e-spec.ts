import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Body Composition (E2E)', () => {
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

  test('[POST] /body-composition', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    })

    const access_token = await jwt.signAsync({ sub: student.id })
    const response = await request(app.getHttpServer())
      .post('/body-composition')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        studentId: student.id,
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
      })

    const bodyCompositionOnDatabase = await prisma.bodyComposition.findFirst({
      where: {
        studentId: student.id,
      },
    })

    expect(response.status).toBe(201)
    expect(bodyCompositionOnDatabase).toBeTruthy()
  })
})
