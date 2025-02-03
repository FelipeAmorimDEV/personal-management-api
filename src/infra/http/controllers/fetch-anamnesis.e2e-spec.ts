import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch Anamnesis (E2E)', () => {
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

  test('[GET] /anamnesis', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'ADMIN',
      },
    })

    await prisma.anamnesis.create({
      data: {
        studentId: user.id,
        fullName: user.name,
        age: 29,
        hadChestPainInLastMonth: false,
        hasBalanceProblems: true,
        hasBoneOrJointProblem: false,
        hasChestPainDuringActivity: true,
        hasHeartProblem: false,
        hasOtherHealthIssues: false,
        takesBloodPressureMedication: true,
      },
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get(`/anamnesis`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.anamnesis).toEqual([
      expect.objectContaining({
        fullName: user.name,
      }),
    ])
    expect(response.body.anamnesis).toHaveLength(1)
  })
})
