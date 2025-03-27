import { QuestionCommentsRepository } from '@/domains/forum/application/repositories/question-comments-repository'
import { DeleteQuestionCommentUseCase } from '@/domains/forum/application/use-case/delete-question-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteQuestionCommentUseCase extends DeleteQuestionCommentUseCase {
  constructor(questionCommentRepository: QuestionCommentsRepository) {
    super(questionCommentRepository)
  }
}
