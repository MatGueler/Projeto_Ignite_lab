import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PrismaService } from 'src/Infra/Database/Prisma/prisma.service';
import { CancelNotifications } from 'src/Use-cases/Cancel-notifications';
import { CountRecipientNotifications } from 'src/Use-cases/Count-recipient-notifications';
import { GetRecipientNotifications } from 'src/Use-cases/Get-recipient-notifications';
import { ReadNotifications } from 'src/Use-cases/read-notifications';
import { SendNotifications } from 'src/Use-cases/Send-notifications';
import { UnReadNotifications } from 'src/Use-cases/Unread-notifications';
import { CreateNotificationsBody } from '../../Dtos/Create-notifications-body';
import { NotificationViewModel } from '../../View-models/Notifications-view-models';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private prisma: PrismaService,
    private sendNotification: SendNotifications,
    private cancelNotification: CancelNotifications,
    private countNotifications: CountRecipientNotifications,
    private getNotifications: GetRecipientNotifications,
    private readNotifications: ReadNotifications,
    private unreadNotifications: UnReadNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotifications.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifications.execute({
      notificationId: id,
    });
  }

  @Get('count/:recipientId')
  async countRecipient(@Param('recipientId') id: string) {
    const { count } = await this.countNotifications.execute({
      recipientId: id,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') id: string) {
    const { notifications } = await this.getNotifications.execute({
      recipientId: id,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  // * @ São decorators
  @Post()
  async create(@Body() body: CreateNotificationsBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
