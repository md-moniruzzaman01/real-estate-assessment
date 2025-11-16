import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GroupChatsModule } from './group-chats/group-chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    TransactionsModule,
    GroupChatsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
