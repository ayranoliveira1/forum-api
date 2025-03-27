import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { DeleteQuestionUseCase } from '@/domains/forum/application/use-case/delete-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteQuestionUseCase extends DeleteQuestionUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
