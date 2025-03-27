import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { FetchQuestionsAnswersUseCase } from '@/domains/forum/application/use-case/fetch-questions-answers'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchQuestionsAnswerUseCase extends FetchQuestionsAnswersUseCase {
  constructor(answerRepository: AnswerRepository) {
    super(answerRepository)
  }
}
