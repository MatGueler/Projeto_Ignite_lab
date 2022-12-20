import { MakeNotifications } from '../../test/factories/Notifications-factories';
import { InMemoryNotificationsRepository } from '../../test/repositories/InMemory-notifications-repository';
import { NotificationsNotFound } from './errors/Notifications-not-found';
import { UnReadNotifications } from './Unread-notifications';

describe('Unead notifications', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnReadNotifications(notificationsRepository);

    const notification = MakeNotifications({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not to be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnReadNotifications(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'faker-notification-id',
      });
    }).rejects.toThrow(NotificationsNotFound);
  });
});
