import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from 'src/common/types/express';
import { CreateMessageDto } from 'src/common/dto/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateMessageDto,@Req() req: AuthenticatedRequest) {
    console.log(dto);
    const userId = 1;
    return this.messagesService.create(dto, userId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getMessages(
    @Query('chatId') chatId: string,
    @Query('skip') skip = '0',
    @Query('take') take = '20',
  ) {
    return this.messagesService.getMessages(Number(chatId), Number(skip), Number(take));
  }
}
