import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { join } from 'path'

describe('Upload Avatar (E2E)', () => {
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

  test('[POST] /upload/avatar', async () => {
    // Cria um usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        role: 'STUDENT',
      },
    })

    // Gera um token JWT para o usuário
    const jwtToken = await jwt.signAsync({ sub: user.id })

    // Caminho para um arquivo de imagem de teste
    const imagePath = join(__dirname, 'test-image.jpeg')

    // Realiza a requisição de upload de avatar
    const response = await request(app.getHttpServer())
      .post('/upload/avatar')
      .set('Authorization', `Bearer ${jwtToken}`)
      .attach('avatar', imagePath)

    // Verifica se a resposta foi bem-sucedida
    expect(response.status).toBe(201)

    // Verifica se o avatar foi atualizado no banco de dados
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    expect(updatedUser?.avatar).toBeTruthy()
  })
})
