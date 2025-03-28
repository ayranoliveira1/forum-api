import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuart } from '@/infra/auth/jwt-auth-guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { NestCreateQuestionUseCase } from '@/infra/nest-use-case/nest-create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodyType = z.infer<typeof createQuestionBodySchema>

const bodyValidationPepe = new ZodValidationPipe(createQuestionBodySchema)

@UseGuards(JwtAuthGuart)
@Controller()
export class CreateQuestionController {
  constructor(private createQuestion: NestCreateQuestionUseCase) {}

  @Post('/questions')
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPepe) body: CreateQuestionBodyType,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
