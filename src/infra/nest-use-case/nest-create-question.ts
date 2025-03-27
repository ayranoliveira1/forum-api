import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { CreateQuestionUseCase } from '@/domains/forum/application/use-case/create-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCreateQuestionUseCase extends CreateQuestionUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
