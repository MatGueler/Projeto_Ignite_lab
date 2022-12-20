import { MakeNotifications } from '../../test/factories/Notifications-factories';
import { InMemoryNotificationsRepository } from '../../test/repositories/InMemory-notifications-repository';
import { NotificationsNotFound } from './errors/Notifications-not-found';
import { ReadNotifications } from './read-notifications';

describe('Read notifications', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotifications(notificationsRepository);

    const notification = MakeNotifications();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotifications(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'faker-notification-id',
      });
    }).rejects.toThrow(NotificationsNotFound);
  });
});
