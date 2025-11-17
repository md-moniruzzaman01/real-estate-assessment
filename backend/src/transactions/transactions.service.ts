import { Injectable } from '@nestjs/common';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from 'src/common/dto/transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        projectId: dto.projectId,
        buyerId: dto.buyerId,
        sellerId: dto.sellerId,
        amount: dto.amount,
      },
      include: {
        project: true,
        buyer: true,
        seller: true,
      },
    });
  }
  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        project: true,
        buyer: true,
        seller: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        project: true,
        buyer: true,
        seller: true,
      },
    });
  }

  async update(id: number, dto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: dto,
      include: {
        project: true,
        buyer: true,
        seller: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
      include: {
        project: true,
        buyer: true,
        seller: true,
      },
    });
  }
}
