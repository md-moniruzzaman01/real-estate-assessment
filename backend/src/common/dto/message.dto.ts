// create-message.dto.ts
import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  chatId: number;

  // Remove senderId from client input; we get it from JWT
  @IsString()
  content: string;
}
