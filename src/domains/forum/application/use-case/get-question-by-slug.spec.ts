import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestions } from 'test/factories/make-questions'
import { InMemoryQuestionAttchmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'

let inMemoryQuestionAttchmentsRepository =
  new InMemoryQuestionAttchmentsRepository()
let inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
  inMemoryQuestionAttchmentsRepository,
)
let sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)

describe('Get Questions By slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttchmentsRepository =
      new InMemoryQuestionAttchmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttchmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a questio ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({ slug: newQuestion.slug.value })

    expect(result.isRight()).toBe(true)
    if ('question' in result.value) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
