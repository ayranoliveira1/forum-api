import { EventHandler } from '@/core/events/event-handler'
import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { SendNotificationUseCase } from '../use-case/send-notification'
import { DomainEvents } from '@/core/events/domain-events'
import { QuestionBestAnswerChosenEvent } from '@/domains/forum/enterprise/events/question-best-answer-chosen-event'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  public async sendBestAnswerChosenNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (!answer) {
      return
    }

    await this.sendNotification.execute({
      recipientId: answer.authorId.toString(),
      title: 'Sua resposta foi escolhida!',
      content: `A Resposta que você enviou em ${question.title.substring(0, 40).concat('...')} foi escolhida pelo autor como a melhor resposta.`,
    })
  }
}
