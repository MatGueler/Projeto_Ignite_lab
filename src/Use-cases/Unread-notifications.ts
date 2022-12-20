import { NotificationRepository } from '../Repositories/Notification-repository';
import { Injectable } from '@nestjs/common';
import { NotificationsNotFound } from './errors/Notifications-not-found';

interface UnReadNotificationRequest {
  notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotifications {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: UnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationsNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
