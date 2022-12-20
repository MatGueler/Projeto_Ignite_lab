import { Notifications } from 'src/Application/Entities/Notification';
import { NotificationRepository } from '../../src/Repositories/Notification-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notifications[] = [];

  async findManyByRecipientId(recipientId: string): Promise<Notifications[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findById(notificationId: string): Promise<Notifications> | null {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notifications): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async create(notification: Notifications) {
    this.notifications.push(notification);
  }
}
