import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GroupChatsService } from './group-chats.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from 'src/common/types/express';
import { AddUserToChatDto, CreateGroupChatDto } from 'src/common/dto/chart.dto';

@Controller('group-chats')
export class GroupChatsController {
  constructor(private groupChatsService: GroupChatsService) {}

  // Create a new group chat
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateGroupChatDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.groupChatsService.create(dto, userId);
  }

  // Add user to a chat
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/users')
  addUser(@Param('id') id: string, @Body() dto: AddUserToChatDto) {
    return this.groupChatsService.addUser(Number(id), dto);
  }

  // Get all group chats for a project
  @UseGuards(AuthGuard('jwt'))
  @Get('project/:projectId')
  getByProject(@Param('projectId') projectId: string) {
    return this.groupChatsService.findByProject(Number(projectId));
  }
}
