import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NestRegisterStudentUseCase } from '@/infra/nest-use-case/nest-register-student'
import { StudentAlreadyExistsError } from '@/domains/forum/application/use-case/errors/student-already-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

type CreateAccountBodyType = z.infer<typeof createAccountBodySchema>

const bodyValidationPepe = new ZodValidationPipe(createAccountBodySchema)

@Controller()
export class CreateAccountController {
  constructor(private registerStudent: NestRegisterStudentUseCase) {}

  @Post('/accounts')
  @HttpCode(201)
  async handle(@Body(bodyValidationPepe) body: CreateAccountBodyType) {
    createAccountBodySchema.parse(body)

    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
