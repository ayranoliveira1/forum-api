import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuart } from '@/infra/auth/jwt-auth-guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodyType = z.infer<typeof createQuestionBodySchema>

const bodyValidationPepe = new ZodValidationPipe(createQuestionBodySchema)

@UseGuards(JwtAuthGuart)
@Controller()
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post('/questions')
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPepe) body: CreateQuestionBodyType,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const slug = this.convertTitleToSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })
  }

  private convertTitleToSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
