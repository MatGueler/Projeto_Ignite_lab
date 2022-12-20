import { Content } from '@Application/Entities/Content';
import {
  Notifications,
  NotificationsProps,
} from '@Application/Entities/Notification';

type override = Partial<NotificationsProps>;

export function MakeNotifications(override: override = {}) {
  return new Notifications({
    category: 'social',
    content: new Content('Nova notificação'),
    recipientId: 'new-recipientId-1',
    ...override,
  });
}
