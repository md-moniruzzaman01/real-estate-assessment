import { IsInt, IsNumber,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CreateTransactionDto {
  @IsInt()
  projectId: number;

  @IsInt()
  buyerId: number;

  @IsInt()
  sellerId: number;

  @IsNumber()
  amount: number;
}


export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}