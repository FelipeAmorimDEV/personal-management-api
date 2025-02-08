import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Payment (E2E)', () => {
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

  test('[POST] /invoices', async () => {
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
      .post('/invoices')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        studentId: student.id,
        methodPayment: 'PIX',
        paymentStatus: 'PENDING',
        description: 'Plano de 3 Meses',
        price: 650,
        dueDate: '2023-08-10',
      })

    const paymentOnDataBase = await prisma.invoice.findFirst({
      where: {
        studentId: student.id,
      },
    })

    expect(response.status).toBe(201)
    expect(paymentOnDataBase).toBeTruthy()
  })
})
