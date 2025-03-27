import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { AnswerQuestionUseCase } from '@/domains/forum/application/use-case/answer-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAnswerQuestionUseCase extends AnswerQuestionUseCase {
  constructor(answerReposotory: AnswerRepository) {
    super(answerReposotory)
  }
}
