import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create.user';
import { FindAllUsersUseCase } from '@/domain/application/use-cases/user/find.all';
import { FindUserByIdUseCase } from '@/domain/application/use-cases/user/find.user.by.id';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ) {}

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
    const user = await this.createUserUseCase.execute(
      createUserDto.name,
      createUserDto.email
    );
    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
  })
  async findAll() {
    return await this.findAllUsersUseCase.execute();
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
  async findOne(@Param('id') id: string) {
    const user = await this.findUserByIdUseCase.execute(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
