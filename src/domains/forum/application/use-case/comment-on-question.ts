import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/@types/errors/errors/resource-not-found-error'

interface CommentOnQUestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRespository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQUestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRespository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
