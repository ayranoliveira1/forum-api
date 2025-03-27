import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { FetchAnswerCommentUseCasse } from '@/domains/forum/application/use-case/fetch-answer-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchAnswerCommentsUseCase extends FetchAnswerCommentUseCasse {
  constructor(answerCommentRepository: AnswerCommentsRepository) {
    super(answerCommentRepository)
  }
}
