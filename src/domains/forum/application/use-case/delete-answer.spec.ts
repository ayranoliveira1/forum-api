import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { InMemoryAnswerAttchmentsRepository } from 'test/repositories/in-memory-anser-attachment-repostory'
import { makeAnswerAttchment } from 'test/factories/make-answer-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerAttchmentsRepository =
  new InMemoryAnswerAttchmentsRepository()
let inMemoryAnswerRepository = new InMemoryAnswerRepository(
  inMemoryAnswerAttchmentsRepository,
)
let sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttchmentsRepository =
      new InMemoryAnswerAttchmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttchmentsRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttchmentsRepository.items.push(
      makeAnswerAttchment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
    )
    inMemoryAnswerAttchmentsRepository.items.push(
      makeAnswerAttchment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttchmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'another-user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
