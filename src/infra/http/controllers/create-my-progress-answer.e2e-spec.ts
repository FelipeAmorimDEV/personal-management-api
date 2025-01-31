import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create My Progress Answer (E2E)', () => {
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

  test('[POST] /my-progress/:id/answer', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    const myProgress = await prisma.myProgress.create({
      data: {
        studentId: student.id,
        comment: 'Avalia meu fisico',
        photo: 'http://image.jpg',
      },
    })

    const access_token = jwt.sign({ sub: student.id })

    const response = await request(app.getHttpServer())
      .post(`/my-progress/${myProgress.id}/answer`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        reply: 'Gostei do resultado',
      })

    const trainingFeedbackOnDataBase = await prisma.myProgressAnswer.findFirst({
      where: {
        reply: 'Gostei do resultado',
      },
    })

    expect(response.status).toBe(201)
    expect(trainingFeedbackOnDataBase).toBeTruthy()
  })
})
