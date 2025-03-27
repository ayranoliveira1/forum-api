import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domains/forum/enterprise/entities/question'
import { Slug } from '@/domains/forum/enterprise/entities/value-objects/slug'
import { Prisma, Question as PrismaQuetion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuetion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityId(raw.bestAnswerId)
          : null,
        slug: Slug.createValueObject(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt || null,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
