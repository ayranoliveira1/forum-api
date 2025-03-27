import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get<PrismaService>(PrismaService)

    jwt = moduleRef.get<JwtService>(JwtService)

    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: await hash('12345678', 8),
      },
    })

    const token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'How to create a question?',
        content: 'I want to create a question, but I do not know how to do it.',
      })

    expect(response.statusCode).toBe(201)

    const quetionOnDatabase = await prisma.questions.findFirst({
      where: {
        title: 'How to create a question?',
      },
    })

    expect(quetionOnDatabase).toBeTruthy()
  })
})
