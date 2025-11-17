import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GroupChatsModule } from './group-chats/group-chats.module';
import { MessagesModule } from './messages/messages.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProjectsModule,
    TransactionsModule,
    GroupChatsModule,
    MessagesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // logs every request
  }
}
