import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswerRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from '@/core/@types/errors/errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityId(answerId),
      authorId: new UniqueEntityId(authorId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
