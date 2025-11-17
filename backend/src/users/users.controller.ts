import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/common/dto/user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
    // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

