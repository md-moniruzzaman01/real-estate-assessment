import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatGateway } from '../chat/chat.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from 'src/common/dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private chatGateway: ChatGateway,
  ) {}

  // Create a new message in an existing chat
  async create(dto: CreateMessageDto) {
    // 1️⃣ Check if chat exists
    console.log(dto)
    const chat = await this.prisma.groupChat.findUnique({
      where: { projectId: dto.projectId },
    });

    if (!chat) {
      throw new NotFoundException(`Chat with id ${dto.projectId} not found`);
    }

    // 2️⃣ Create message
    const message = await this.prisma.message.create({
      data: {
        chatId: dto.chatId,
        senderId: dto.senderId,
        content: dto.content,
      },
      include: { sender: true },
    });

    // 3️⃣ Emit to WebSocket
    this.chatGateway.server.to(`chat_${dto.chatId}`).emit('newMessage', message);

    return message;
  }

  // Fetch messages for a chat
  async getMessages(chatId: number, skip = 0, take = 20) {
    // 1️⃣ Check if chat exists
    const chat = await this.prisma.groupChat.findUnique({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException(`Chat with id ${chatId} not found`);
    }

    // 2️⃣ Return messages
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { timestamp: 'asc' },
      skip,
      take,
      include: { sender: true },
    });
  }
}
