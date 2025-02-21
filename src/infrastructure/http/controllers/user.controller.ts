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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ description: 'Payload to create a new user', type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  async create(@Body() createUserDto: UserDto) {
    const user = new User({
      name: createUserDto.name,
      email: createUserDto.email,
    });
    await this.userRepository.create(user);
    return { message: 'User created successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
  })
  async findAll() {
    return await this.userRepository.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', required: true })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    console.log('Received ID:', id);
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
