import { ConflictException } from '@nestjs/common'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountBodyType = z.infer<typeof createAccountBodySchema>

const bodyValidationPepe = new ZodValidationPipe(createAccountBodySchema)

@Controller()
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post('/accounts')
  @HttpCode(201)
  async handle(@Body(bodyValidationPepe) body: CreateAccountBodyType) {
    createAccountBodySchema.parse(body)

    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User already exists')
    }

    const passwordHash = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })
  }
}
