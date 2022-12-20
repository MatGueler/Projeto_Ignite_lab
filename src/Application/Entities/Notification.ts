import { randomUUID } from 'node:crypto';
import { Replace } from '../../Helpers/Replace';
import { Content } from './Content';

export interface NotificationsProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  cancelAt?: Date | null;
}

export class Notifications {
  private _id: string;
  private props: NotificationsProps;
  constructor(
    props: Replace<NotificationsProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  // - Get recipientId value
  public get id(): string {
    return this._id;
  }

  // - Set recipientId value
  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  // - Get recipientId value
  public get recipientId(): string {
    return this.props.recipientId;
  }

  // - Set category value
  public set category(category: string) {
    this.props.category = category;
  }

  // - Get category value
  public get category(): string {
    return this.props.category;
  }

  // - Set content value
  public set content(content: Content) {
    this.props.content = content;
  }

  // - Get content value
  public get content(): Content {
    return this.props.content;
  }

  // - Set read notification
  public read() {
    this.props.readAt = new Date();
  }

  // - Set unread notification
  public unread() {
    this.props.readAt = null;
  }

  // - Get readAt value
  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  // - Get createdAt value
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  // - Set cancelAt value
  public cancel() {
    this.props.cancelAt = new Date();
  }

  // - Get readAt value
  public get cancelAt(): Date | null | undefined {
    return this.props.cancelAt;
  }
}
