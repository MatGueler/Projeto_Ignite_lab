import { Content } from '@Application/Entities/Content';
import { Notifications } from '@Application/Entities/Notification';

import { Notification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notifications) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
      cancelAt: notification.cancelAt ?? null,
    };
  }

  static toDomain(notification: Notification) {
    return new Notifications(
      {
        content: new Content(notification.content),
        recipientId: notification.recipientId,
        category: notification.category,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
        cancelAt: notification.cancelAt,
      },
      notification.id,
    );
  }
}
