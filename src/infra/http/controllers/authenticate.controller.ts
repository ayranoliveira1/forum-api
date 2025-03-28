import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NestAuthenticateStudentUseCase } from '@/infra/nest-use-case/nest-authenticate-student'
import { InvalidCredentialsError } from '@/domains/forum/application/use-case/errors/invalid-credentials-error'
import { Public } from '@/infra/auth/public'

const AuthenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBodyType = z.infer<typeof AuthenticateBodySchema>

const bodyValidationPepe = new ZodValidationPipe(AuthenticateBodySchema)

@Controller()
@Public()
export class AuthenticateController {
  constructor(private authenticateStudent: NestAuthenticateStudentUseCase) {}

  @Post('/sessions')
  @HttpCode(201)
  async handle(@Body(bodyValidationPepe) body: AuthenticateBodyType) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { token } = result.value

    return {
      token: token,
    }
  }
}
