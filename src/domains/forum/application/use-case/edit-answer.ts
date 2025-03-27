import { Either, left, right } from '@/core/either'
import { AnswerRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from '@/core/@types/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { AnswerAttchmentsRepository } from '../repositories/answer-attachment-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttchmentsRepository: AnswerAttchmentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttchmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachment) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachment),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answerRepository.save(answer)

    return right(null)
  }
}
