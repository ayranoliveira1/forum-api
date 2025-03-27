import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestions } from 'test/factories/make-questions'
import { FetchRecentsQuestionsUseCase } from './fetch-recents-questions'
import { InMemoryQuestionAttchmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'

let inMemoryQuestionAttchmentsRepository =
  new InMemoryQuestionAttchmentsRepository()
let inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
  inMemoryQuestionAttchmentsRepository,
)
let sut = new FetchRecentsQuestionsUseCase(inMemoryQuestionsRepository)

describe('Fetch Recents questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttchmentsRepository =
      new InMemoryQuestionAttchmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttchmentsRepository,
    )
    sut = new FetchRecentsQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recents questioms', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestions({ createdAt: new Date(2025, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestions({ createdAt: new Date(2025, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestions({ createdAt: new Date(2025, 0, 23) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recents questioms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestions())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.questions).toHaveLength(2)
  })
})
