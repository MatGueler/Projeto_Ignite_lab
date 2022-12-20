import { NotificationRepository } from '../Repositories/Notification-repository';
import { Injectable } from '@nestjs/common';
import { NotificationsNotFound } from './errors/Notifications-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotifications {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationsNotFound();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
