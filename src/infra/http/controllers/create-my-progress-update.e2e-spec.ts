import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create My Progress Update (E2E)', () => {
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

  test('[POST] /my-progress', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    const access_token = jwt.sign({ sub: student.id })

    const response = await request(app.getHttpServer())
      .post('/my-progress')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        photo: 'imagem.jpg',
        comment: 'O que acha do meu fisico',
      })

    const trainingFeedbackOnDataBase = await prisma.myProgress.findFirst({
      where: {
        photo: 'imagem.jpg',
      },
    })

    expect(response.status).toBe(201)
    expect(trainingFeedbackOnDataBase).toBeTruthy()
  })
})
