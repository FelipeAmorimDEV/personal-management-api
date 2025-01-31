import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch My Progress Update (E2E)', () => {
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

  test('[GET] /my-progress', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    await prisma.myProgress.create({
      data: {
        studentId: student.id,
        comment: 'Avalia o meu fisico?',
        photo: 'http://foto.png',
      },
    })

    const jwtToken = await jwt.signAsync({ sub: student.id })

    const response = await request(app.getHttpServer())
      .get(`/my-progress`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.myProgress).toHaveLength(1)
  })
})
