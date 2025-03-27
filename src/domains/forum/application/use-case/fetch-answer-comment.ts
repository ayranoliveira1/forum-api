import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentUseCaseResponse = Either<
  null,
  {
    answerComment: AnswerComment[]
  }
>

export class FetchAnswerCommentUseCasse {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findManyByAnswerId(
      answerId,
      { page },
    )

    return right({
      answerComment,
    })
  }
}
