import { AnswerAttchmentsRepository } from '@/domains/forum/application/repositories/answer-attachment-repository'
import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { EditAnswerUseCase } from '@/domains/forum/application/use-case/edit-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestEditAnswerUseCase extends EditAnswerUseCase {
  constructor(
    answerRepository: AnswerRepository,
    answerAttchmentsRepository: AnswerAttchmentsRepository,
  ) {
    super(answerRepository, answerAttchmentsRepository)
  }
}
