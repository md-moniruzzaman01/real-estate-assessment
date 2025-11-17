import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../chat/chat.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from 'src/common/dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private chatGateway: ChatGateway,
  ) {}

  async create(dto: CreateMessageDto, senderId: number) {
    const message = await this.prisma.message.create({
      data: {
        chatId: dto.chatId,
        senderId,
        content: dto.content,
      },
      include: { sender: true },
    });

    // Emit WebSocket event
    this.chatGateway.server.to(`chat_${dto.chatId}`).emit('newMessage', message);

    return message;
  }

  async getMessages(chatId: number, skip = 0, take = 20) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { timestamp: 'asc' },
      skip,
      take,
      include: { sender: true },
    });
  }
}
