import { MakeNotifications } from '../../test/factories/Notifications-factories';
import { InMemoryNotificationsRepository } from '../../test/repositories/InMemory-notifications-repository';
import { CountRecipientNotifications } from './Count-recipient-notifications';

describe('Count notifications', () => {
  it('should be able to count many notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotification = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      MakeNotifications({ recipientId: 'new-recipientId-1' }),
    );
    await notificationsRepository.create(
      MakeNotifications({ recipientId: 'new-recipientId-1' }),
    );
    await notificationsRepository.create(
      MakeNotifications({ recipientId: 'new-recipientId-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'new-recipientId-1',
    });

    expect(count).toEqual(2);
  });
});
