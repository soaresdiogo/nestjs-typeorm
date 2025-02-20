import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from '@/domain/enterprise/entities/user';
import { UserRepository } from '@/domain/application/repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async create(@Body() createUserDto: UserDto) {
    const user = new User(
      createUserDto.id,
      createUserDto.name,
      createUserDto.email
    );
    await this.userRepository.create(user);
    return { message: 'User created successfully' };
  }

  @Get()
  async findAll() {
    return await this.userRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
