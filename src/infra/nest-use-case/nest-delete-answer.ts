import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { DeleteAnswerUseCase } from '@/domains/forum/application/use-case/delete-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteAnswerUseCase extends DeleteAnswerUseCase {
  constructor(answerRepository: AnswerRepository) {
    super(answerRepository)
  }
}
