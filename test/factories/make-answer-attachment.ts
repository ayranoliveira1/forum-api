import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domains/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttchment(
  overrides: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttchment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides,
    },
    id,
  )

  return answerAttchment
}
