import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuart } from '@/auth/jwt-auth-guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const fetchRecentQuestionsQuerySchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type FetchRecentQuestionsQueryType = z.infer<
  typeof fetchRecentQuestionsQuerySchema
>

const queryValidationPipe = new ZodValidationPipe(
  fetchRecentQuestionsQuerySchema,
)

@Controller()
@UseGuards(JwtAuthGuart)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get('/questions')
  async handle(
    @Query('page', queryValidationPipe) page: FetchRecentQuestionsQueryType,
  ) {
    const perPage = 10

    const questions = await this.prisma.questions.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return questions
  }
}
