import { PaginationParms } from '@/core/repositories/pagination-params'
import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { Answer } from '@/domains/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }
  findManyByQuestionId(
    questionId: string,
    params: PaginationParms,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }
  save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
