import { QuestionCommentsRepository } from '@/domains/forum/application/repositories/question-comments-repository'
import { FetchQuestionCommentUseCase } from '@/domains/forum/application/use-case/fetch-question-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFetchQuestionCommentsUseCase extends FetchQuestionCommentUseCase {
  constructor(questionCommentRepository: QuestionCommentsRepository) {
    super(questionCommentRepository)
  }
}
