import { PaginationParms } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domains/forum/enterprise/entities/answer-comments'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }
  findManyByAnswerId(
    answerId: string,
    params: PaginationParms,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
