import { AnswerAttchmentsRepository } from '@/domains/forum/application/repositories/answer-attachment-repository'
import { AnswerAttachment } from '@/domains/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttchmentsRepository
  implements AnswerAttchmentsRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }
  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
