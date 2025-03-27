import { makeQuestions } from 'test/factories/make-questions'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ResourceNotFoundError } from '@/core/@types/errors/errors/resource-not-found-error'
import { InMemoryQuestionAttchmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'

let inMemoryQuestionAttachmentRepository =
  new InMemoryQuestionAttchmentsRepository()
let inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
let inMemoryQuestionRepository = new InMemoryQuestionsRepository(
  inMemoryQuestionAttachmentRepository,
)
let sut = new CommentOnQuestionUseCase(
  inMemoryQuestionRepository,
  inMemoryQuestionCommentRepository,
)

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttchmentsRepository()

    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )

    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question ', async () => {
    const question = makeQuestions()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })

  it('should not be able to comment on teste ', async () => {
    const question = makeQuestions()

    await inMemoryQuestionRepository.create(question)

    const result = await sut.execute({
      questionId: 'invalid-id',
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
