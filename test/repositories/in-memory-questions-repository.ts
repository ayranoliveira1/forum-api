import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParms } from '@/core/repositories/pagination-params'
import { QuestionAttchmentsRepository } from '@/domains/forum/application/repositories/question-attachment-repository'
import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { Question } from '@/domains/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentRepository: QuestionAttchmentsRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find(
      (question) => question.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((question) => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecents({ page }: PaginationParms) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)

    this.items[index] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async create(question: Question) {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(index, 1)

    await this.questionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
