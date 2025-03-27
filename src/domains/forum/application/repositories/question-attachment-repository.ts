import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttchmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
