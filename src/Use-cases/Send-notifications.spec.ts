import { InMemoryNotificationsRepository } from '../../test/repositories/InMemory-notifications-repository';
import { SendNotifications } from './Send-notifications';

describe('Send notifications', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotifications(notificationsRepository);
    const { notification } = await sendNotification.execute({
      content: 'Você recebeu uma ligação',
      category: 'social',
      recipientId: 'recipient-id-exemple',
    });
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
