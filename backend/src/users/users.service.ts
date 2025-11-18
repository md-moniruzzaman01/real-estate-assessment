import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const defaultPassword = '123456'; // default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });
  }
  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
    async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  
}
