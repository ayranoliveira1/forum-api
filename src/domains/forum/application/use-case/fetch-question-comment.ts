import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentUseCaseResponse = Either<
  null,
  {
    questionComment: QuestionComment[]
  }
>

export class FetchQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComment,
    })
  }
}
