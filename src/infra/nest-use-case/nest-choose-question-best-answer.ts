import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { ChooseQuestionBestAnswerUseCase } from '@/domains/forum/application/use-case/choose-question-best-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestChooseQuestionBestAnswerUseCase extends ChooseQuestionBestAnswerUseCase {
  constructor(
    questionRepository: QuestionsRepository,
    answerRepository: AnswerRepository,
  ) {
    super(questionRepository, answerRepository)
  }
}
