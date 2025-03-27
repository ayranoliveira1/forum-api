import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { FetchRecentsQuestionsUseCase } from '@/domains/forum/application/use-case/fetch-recents-questions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchRecentsQuestionsUseCase extends FetchRecentsQuestionsUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}
