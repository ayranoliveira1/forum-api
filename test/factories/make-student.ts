import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domains/forum/enterprise/entities/student'

import { faker } from '@faker-js/faker'

export function makeStudent(
  overrides: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const question = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...overrides,
    },
    id,
  )

  return question
}
