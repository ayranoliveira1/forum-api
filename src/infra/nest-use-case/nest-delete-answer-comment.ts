import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { DeleteAnswerCommentUseCase } from '@/domains/forum/application/use-case/delete-answer-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteAnswerCommentUseCase extends DeleteAnswerCommentUseCase {
  constructor(answerCommentRepository: AnswerCommentsRepository) {
    super(answerCommentRepository)
  }
}
