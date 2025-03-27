import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domains/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  overrides: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const question = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overrides,
    },
    id,
  )

  return question
}
