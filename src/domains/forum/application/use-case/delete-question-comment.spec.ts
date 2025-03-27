import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-commet'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'

let inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
let sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question  comment ', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: newQuestionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items.length).toBe(0)
  })

  it('should not be able to delete a question comment from another user ', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    const result = await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: 'another-user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
