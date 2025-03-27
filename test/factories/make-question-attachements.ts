import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domains/forum/enterprise/entities/question-attachment'

export function makeQuestionAttchment(
  overrides: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttchment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides,
    },
    id,
  )

  return questionAttchment
}
