import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGroupChatDto {
  @IsInt()
  projectId: number;

  @IsInt()
  chatId: number;

  @IsOptional()
  @IsString()
  mlsId?: string;
}

export class AddUserToChatDto {
  @IsInt()
  userId: number;
}
