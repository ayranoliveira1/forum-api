import { UnauthorizedException } from '@nestjs/common'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

const AuthenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBodyType = z.infer<typeof AuthenticateBodySchema>

const bodyValidationPepe = new ZodValidationPipe(AuthenticateBodySchema)

@Controller()
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post('/sessions')
  @HttpCode(201)
  async handle(@Body(bodyValidationPepe) body: AuthenticateBodyType) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const token = this.jwt.sign({ sub: user.id })

    return {
      token,
    }
  }
}
