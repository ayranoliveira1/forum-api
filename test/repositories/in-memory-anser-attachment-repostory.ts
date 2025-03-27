import { AnswerAttchmentsRepository } from '@/domains/forum/application/repositories/answer-attachment-repository'
import { AnswerAttachment } from '@/domains/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttchmentsRepository
  implements AnswerAttchmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttchments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttchments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachment
  }
}
