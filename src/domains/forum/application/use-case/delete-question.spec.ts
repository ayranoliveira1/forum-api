import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestions } from 'test/factories/make-questions'
import { DeleteQuestionUseCase } from './delete-question'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { InMemoryQuestionAttchmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionAttchment } from 'test/factories/make-question-attachements'

let inMemoryQuestionAttachmentRepository =
  new InMemoryQuestionAttchmentsRepository()
let inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
  inMemoryQuestionAttachmentRepository,
)
let sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)

describe('Delete Questions By Id', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttchmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttchment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
    )
    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttchment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items.length).toBe(0)
  })

  it('should not be able to delete a question from another user ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'another-user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
