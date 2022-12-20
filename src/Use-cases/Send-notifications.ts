import { NotificationRepository } from '../Repositories/Notification-repository';
import { Content } from '@Application/Entities/Content';
import { Notifications } from '@Application/Entities/Notification';
import { Injectable } from '@nestjs/common';

interface ISendNotificationsRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationsResponse {
  notification: Notifications;
}

@Injectable()
export class SendNotifications {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: ISendNotificationsRequest,
  ): Promise<ISendNotificationsResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notifications({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
