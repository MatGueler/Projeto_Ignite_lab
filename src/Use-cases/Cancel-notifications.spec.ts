import { MakeNotifications } from '../../test/factories/Notifications-factories';
import { InMemoryNotificationsRepository } from '../../test/repositories/InMemory-notifications-repository';
import { CancelNotifications } from './Cancel-notifications';
import { NotificationsNotFound } from './errors/Notifications-not-found';

describe('Cancel notifications', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotifications(notificationsRepository);

    const notification = MakeNotifications();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotifications(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'faker-notification-id',
      });
    }).rejects.toThrow(NotificationsNotFound);
  });
});
