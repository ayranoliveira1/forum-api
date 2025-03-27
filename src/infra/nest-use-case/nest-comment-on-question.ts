import { QuestionCommentsRepository } from '@/domains/forum/application/repositories/question-comments-repository'
import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { CommentOnQuestionUseCase } from '@/domains/forum/application/use-case/comment-on-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCommentOnQuestionUseCase extends CommentOnQuestionUseCase {
  constructor(
    questionsRepository: QuestionsRepository,
    questionCommentRespository: QuestionCommentsRepository,
  ) {
    super(questionsRepository, questionCommentRespository)
  }
}
