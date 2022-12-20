import { Content } from './Content';
import { Notifications } from './Notification';

describe('Create notifications', () => {
  it('should be able to create a notification', () => {
    const notification = new Notifications({
      content: new Content('Você recebeu uma ligação'),
      category: 'social',
      recipientId: 'recipient-id-exemple',
    });
    expect(notification).toBeTruthy();
  });
});
