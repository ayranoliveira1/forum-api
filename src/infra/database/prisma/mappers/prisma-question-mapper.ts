import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domains/forum/enterprise/entities/question'
import { Slug } from '@/domains/forum/enterprise/entities/value-objects/slug'
import { Questions as PrismaQuetion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuetion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        bestAnswerId: undefined,
        slug: Slug.createValueObject(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt || null,
      },
      new UniqueEntityId(raw.id),
    )
  }
}
