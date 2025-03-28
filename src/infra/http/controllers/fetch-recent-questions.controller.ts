import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuart } from '@/infra/auth/jwt-auth-guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { NestFetchRecentsQuestionsUseCase } from '@/infra/nest-use-case/nest-fetch-recentes-questions'
import { QuestionPresenter } from '../presenters/question-presenter'

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
  constructor(private recentsQuestions: NestFetchRecentsQuestionsUseCase) {}

  @Get('/questions')
  async handle(
    @Query('page', queryValidationPipe) page: FetchRecentQuestionsQueryType,
  ) {
    const results = await this.recentsQuestions.execute({
      page,
    })

    if (results.isLeft()) {
      throw new BadRequestException()
    }

    const questions = results.value?.questions

    return {
      questions: questions.map(QuestionPresenter.toHttp),
    }
  }
}
