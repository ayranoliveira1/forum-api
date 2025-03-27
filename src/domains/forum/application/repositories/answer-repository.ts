import { PaginationParms } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export abstract class AnswerRepository {
  abstract findById(id: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParms,
  ): Promise<Answer[]>
  abstract save(answer: Answer): Promise<void>
  abstract create(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
}
