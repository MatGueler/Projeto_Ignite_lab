import { MakeNotifications } from '../../test/factories/Notifications-factories';
import { InMemoryNotificationsRepository } from '../../test/repositories/InMemory-notifications-repository';
import { GetRecipientNotifications } from './Get-recipient-notifications';

describe('Get notifications', () => {
  it('should be able to get many notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'new-recipientId-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'new-recipientId-1' }),
        expect.objectContaining({ recipientId: 'new-recipientId-1' }),
      ]),
    );
  });
});
