import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question-repossitory'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attchments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-reposiotory'
import { PrismaAnswerAttchmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { QuestionCommentsRepository } from '@/domains/forum/application/repositories/question-comments-repository'
import { QuestionAttchmentsRepository } from '@/domains/forum/application/repositories/question-attachment-repository'
import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { AnswerCommentsRepository } from '@/domains/forum/application/repositories/answer-comments-repository'
import { AnswerAttchmentsRepository } from '@/domains/forum/application/repositories/answer-attachment-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttchmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttchmentsRepository,
      useClass: PrismaAnswerAttchmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    QuestionCommentsRepository,
    QuestionAttchmentsRepository,
    AnswerRepository,
    AnswerCommentsRepository,
    AnswerAttchmentsRepository,
  ],
})
export class DatabaseModule {}
