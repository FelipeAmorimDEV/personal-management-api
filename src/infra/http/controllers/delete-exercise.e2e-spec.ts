import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Edit Exercise (E2E)', () => {
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

  test('[POST] /exercises', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const exercise = await prisma.exercise.create({
      data: {
        name: 'Supino Reto',
        videoUrl: 'http://youtube.com',
        description: 'Exercicio trabalha peito medio',
      },
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .delete(`/exercises/${exercise.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    const exerciseEditedOnDataBase = await prisma.exercise.findFirst({
      where: {
        name: 'Supino Reto',
      },
    })

    expect(response.status).toBe(200)
    expect(exerciseEditedOnDataBase).toBeFalsy()
  })
})
