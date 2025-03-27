import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionsProps,
} from '@/domains/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestions(
  overrides: Partial<QuestionsProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overrides,
    },
    id,
  )

  return question
}
