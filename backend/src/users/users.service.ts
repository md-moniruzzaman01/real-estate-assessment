import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user-dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
      },
    });
  }
   async findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

