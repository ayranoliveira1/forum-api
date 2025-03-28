import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { NestCreateQuestionUseCase } from '../nest-use-case/nest-create-question'
import { NestFetchRecentsQuestionsUseCase } from '../nest-use-case/nest-fetch-recentes-questions'
import { CryptographyModule } from './cryptography/cryptography.module'
import { NestRegisterStudentUseCase } from '../nest-use-case/nest-register-student'
import { NestAuthenticateStudentUseCase } from '../nest-use-case/nest-authenticate-student'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    NestCreateQuestionUseCase,
    NestFetchRecentsQuestionsUseCase,
    NestRegisterStudentUseCase,
    NestAuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
