import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { GetQuestionBySlugUseCase } from '@/domains/forum/application/use-case/get-question-by-slug'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestGetQuestionBySlugUseCase extends GetQuestionBySlugUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
