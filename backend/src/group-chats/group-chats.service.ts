import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddUserToChatDto, CreateGroupChatDto } from 'src/common/dto/chart.dto';

@Injectable()
export class GroupChatsService {
  constructor(private prisma: PrismaService) {}

  // Create a new group chat
  async create(dto: CreateGroupChatDto) {
    return this.prisma.groupChat.create({
      data: {
        projectId: dto.projectId,
        mlsId: dto.mlsId,
        groupChatUsers: {
          create: [{ userId: 1 }, { userId: 2 }],
        },
      },
      include: { groupChatUsers: true, messages: true },
    });
  }

  // Add a user to an existing chat
  async addUser(chatId: number, dto: AddUserToChatDto) {
    return this.prisma.groupChatUser.create({
      data: {
        chatId,
        userId: dto.userId,
      },
    });
  }

  // Get all chats for a project
  async findByProject(projectId: number) {
    return this.prisma.groupChat.findMany({
      where: { projectId },
      include: { groupChatUsers: true, messages: true },
    });
  }
}
