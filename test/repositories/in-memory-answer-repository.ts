import { PaginationParms } from '@/core/repositories/pagination-params'
import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { Answer } from '@/domains/forum/enterprise/entities/answer'
import { InMemoryAnswerAttchmentsRepository } from './in-memory-anser-attachment-repostory'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  constructor(
    private inMemoryAnswerAttachmentRepository: InMemoryAnswerAttchmentsRepository,
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParms) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items[index] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(index, 1)

    await this.inMemoryAnswerAttachmentRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )
  }
}
