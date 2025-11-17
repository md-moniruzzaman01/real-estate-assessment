import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserRole {
  buyer = 'buyer',
  seller = 'seller',
  realtor = 'realtor',
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}
