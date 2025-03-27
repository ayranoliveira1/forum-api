import { Question } from '@/domains/forum/enterprise/entities/question'

export class QuestionPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      content: question.content,
      Slug: question.slug.value,
      bestAnswwerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
