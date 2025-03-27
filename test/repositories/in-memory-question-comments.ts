import { PaginationParms } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domains/forum/enterprise/entities/question-comments'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParms) {
    const questionComment = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const index = this.items.findIndex((item) => item.id === questionComment.id)

    this.items.splice(index, 1)
  }
}
