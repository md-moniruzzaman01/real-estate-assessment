import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ChatModule } from 'src/chat/ChatModule';

@Module({
  imports: [ChatModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
