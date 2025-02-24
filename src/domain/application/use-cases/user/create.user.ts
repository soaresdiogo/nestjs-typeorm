import { User } from '@/domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const user = new User({
      name,
      email,
    });
    await this.userRepository.create(user);
    return user;
  }
}
