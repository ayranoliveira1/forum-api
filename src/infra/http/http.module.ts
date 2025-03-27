import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { NestCreateQuestionUseCase } from '../nest-use-case/nest-create-question'
import { NestFetchRecentsQuestionsUseCase } from '../nest-use-case/nest-fetch-recentes-questions'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [NestCreateQuestionUseCase, NestFetchRecentsQuestionsUseCase],
})
export class HttpModule {}
