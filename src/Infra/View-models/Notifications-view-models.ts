import { Notifications } from '@Application/Entities/Notification';

export class NotificationViewModel {
  static toHttp(notification: Notifications) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
    };
  }
}
