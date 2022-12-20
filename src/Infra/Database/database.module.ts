import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/Repositories/Notification-repository';
import { PrismaService } from './Prisma/prisma.service';
import { PrismaNotificationsRepository } from './Prisma/Repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
