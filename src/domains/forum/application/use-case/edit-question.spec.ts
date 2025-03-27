import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestions } from 'test/factories/make-questions'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { InMemoryQuestionAttchmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { makeQuestionAttchment } from 'test/factories/make-question-attachements'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionAttchmentsRepository =
  new InMemoryQuestionAttchmentsRepository()

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
  inMemoryQuestionAttchmentsRepository,
)
let sut = new EditQuestionUseCase(
  inMemoryQuestionsRepository,
  inMemoryQuestionAttchmentsRepository,
)

describe('Edit Questions By Id', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttchmentsRepository,
    )
    inMemoryQuestionAttchmentsRepository =
      new InMemoryQuestionAttchmentsRepository()

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttchmentsRepository,
    )
  })

  it('should be able to edit a question ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttchmentsRepository.items.push(
      makeQuestionAttchment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttchment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: 'new title',
      content: 'new content',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new content',
    })
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should not be able to edit a question from another user ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'another-user-id',
      title: 'new title',
      content: 'new content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
