import { PaginationParms } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domains/forum/enterprise/entities/answer-comments'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParms) {
    const answerComment = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComment
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const index = this.items.findIndex((item) => item.id === answerComment.id)

    this.items.splice(index, 1)
  }
}
