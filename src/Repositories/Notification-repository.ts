import { Notifications } from '@Application/Entities/Notification';

export abstract class NotificationRepository {
  abstract create(notification: Notifications): Promise<void>;
  abstract findById(notificationId: string): Promise<Notifications | null>;
  abstract save(notification: Notifications): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notifications[]>;
}
