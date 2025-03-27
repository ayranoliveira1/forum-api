import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domains/forum/application/repositories/questions-repository'
import { AnswerCreateEvent } from '@/domains/forum/enterprise/events/answer-create-event'
import { SendNotificationUseCase } from '../use-case/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreateEvent.name,
    )
  }

  public async sendNewAnswerNotification({ answer }: AnswerCreateEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return
    }

    await this.sendNotification.execute({
      recipientId: question.authorId.toString(),
      title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
      content: answer.excerpt,
    })
  }
}
