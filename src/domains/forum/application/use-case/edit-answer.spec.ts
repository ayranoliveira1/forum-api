import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { InMemoryAnswerAttchmentsRepository } from 'test/repositories/in-memory-anser-attachment-repostory'
import { makeAnswerAttchment } from 'test/factories/make-answer-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerAttchmentsRepository =
  new InMemoryAnswerAttchmentsRepository()
let inMemoryAnswerRepository = new InMemoryAnswerRepository(
  inMemoryAnswerAttchmentsRepository,
)
let sut = new EditAnswerUseCase(
  inMemoryAnswerRepository,
  inMemoryAnswerAttchmentsRepository,
)

describe('Edit Answer By Id', () => {
  beforeEach(() => {
    inMemoryAnswerAttchmentsRepository =
      new InMemoryAnswerAttchmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttchmentsRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerAttchmentsRepository,
    )
  })

  it('should be able to edit a answer ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttchmentsRepository.items.push(
      makeAnswerAttchment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttchment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'new content',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'new content',
    })
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should not be able to edit a answer from another user ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'another-user-id',
      content: 'new content',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
