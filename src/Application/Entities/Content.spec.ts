import { Content } from './Content';

describe('Notifications content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma ligação');
    expect(content).toBeTruthy();
  });

  it('should not to be able to create notification content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('should not to be able to create notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
