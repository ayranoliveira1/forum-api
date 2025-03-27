import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'

let inMemoryNotificationRepository = new InMemoryNotificationRepository()
let sut = new SendNotificationUseCase(inMemoryNotificationRepository)

describe('Send Notifications', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to create a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'new notification',
      content: 'create a new notification',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].id).toEqual(
      result.value?.notification.id,
    )
    expect(result.value?.notification.content).toEqual(
      'create a new notification',
    )
  })
})
