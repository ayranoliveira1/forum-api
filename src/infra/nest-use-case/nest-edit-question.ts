import { QuestionAttchmentsRepository } from '@/domains/forum/application/repositories/question-attachment-repository'
import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { EditQuestionUseCase } from '@/domains/forum/application/use-case/edit-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestEditQuestionUseCase extends EditQuestionUseCase {
  constructor(
    questionRepository: QuestionsRepository,
    questionAttachmentRepository: QuestionAttchmentsRepository,
  ) {
    super(questionRepository, questionAttachmentRepository)
  }
}
