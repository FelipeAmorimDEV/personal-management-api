import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Anamnesis (E2E)', () => {
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

  test('[POST] /anamnesis', async () => {
    const student = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    })

    const access_token = await jwt.signAsync({ sub: student.id })
    const response = await request(app.getHttpServer())
      .post('/anamnesis')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        studentId: student.id,
        fullName: 'John Doe',
        age: 29,
        hadChestPainInLastMonth: false,
        hasBalanceProblems: true,
        hasBoneOrJointProblem: false,
        hasChestPainDuringActivity: true,
        hasHeartProblem: false,
        hasOtherHealthIssues: false,
        takesBloodPressureMedication: true,
      })

    const anamnesisOnDatabase = await prisma.anamnesis.findFirst({
      where: {
        fullName: 'John Doe',
      },
    })
    expect(response.status).toBe(201)
    expect(anamnesisOnDatabase).toBeTruthy()
  })
})
