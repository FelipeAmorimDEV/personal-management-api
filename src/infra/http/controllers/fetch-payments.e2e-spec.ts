import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Payments (E2E)', () => {
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

  test('[GET] /payments', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoestudent@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    await prisma.invoice.create({
      data: {
        studentId: student.id,
        methodPayment: 'PIX',
        invoiceStatus: 'PENDING',
        createdAt: new Date(),
        description: 'Plano de 3 Meses',
        price: 650,
        dueDate: new Date('2025-02-10'),
      },
    })

    const jwtToken = await jwt.signAsync({ sub: student.id })

    const response = await request(app.getHttpServer())
      .get(`/payments`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
})
