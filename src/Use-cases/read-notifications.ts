import { NotificationRepository } from '../Repositories/Notification-repository';
import { Injectable } from '@nestjs/common';
import { NotificationsNotFound } from './errors/Notifications-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotifications {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationsNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
