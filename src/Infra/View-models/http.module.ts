import { Module } from '@nestjs/common';
import { CancelNotifications } from '../../Use-cases/Cancel-notifications';
import { CountRecipientNotifications } from '../../Use-cases/Count-recipient-notifications';
import { GetRecipientNotifications } from '../../Use-cases/Get-recipient-notifications';
import { ReadNotifications } from '../../Use-cases/read-notifications';
import { SendNotifications } from '../../Use-cases/Send-notifications';
import { UnReadNotifications } from '../../Use-cases/Unread-notifications';
import { DatabaseModule } from '../Database/database.module';
import { PrismaService } from '../Database/Prisma/prisma.service';
import { NotificationsController } from '../Http/Controllers/Notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotifications,
    CancelNotifications,
    ReadNotifications,
    UnReadNotifications,
    CountRecipientNotifications,
    GetRecipientNotifications,
    PrismaService,
  ],
})
export class HttpModule {}
