import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Edit Student (E2E)', () => {
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

  test('[PUT] /profile', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .put(`/profile`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'Felipe Amorim',
        password: 'lola32145',
        old_password: '123456',
      })

    const exerciseEditedOnDataBase = await prisma.user.findFirst({
      where: {
        name: 'Felipe Amorim',
      },
    })

    expect(response.status).toBe(200)
    expect(exerciseEditedOnDataBase).toBeTruthy()
  })
})
