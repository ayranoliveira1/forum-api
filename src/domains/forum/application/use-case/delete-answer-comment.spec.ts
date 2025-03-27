import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'

let inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
let sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete a question  comment ', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: newAnswerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items.length).toBe(0)
  })

  it('should not be able to delete a question comment from another user ', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    const result = await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: 'another-user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
