import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface AnsWerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answerReposotory: AnswerRepository) {}

  async excute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnsWerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    const attachments = attachmentsIds.map((attachment) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachment),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(attachments)

    await this.answerReposotory.create(answer)

    return right({
      answer,
    })
  }
}
