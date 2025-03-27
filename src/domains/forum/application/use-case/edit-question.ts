import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/@types/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttchmentsRepository } from '../repositories/question-attachment-repository'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttchmentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const QuestionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(QuestionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.save(question)

    return right(null)
  }
}
