import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { CommentOnAnswerUseCase } from '@/domains/forum/application/use-case/comment-on-answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCommentOnAnswerUseCase extends CommentOnAnswerUseCase {
  constructor(
    answerRepository: AnswerRepository,
    answerCommentRepository: AnswerCommentsRepository,
  ) {
    super(answerRepository, answerCommentRepository)
  }
}
