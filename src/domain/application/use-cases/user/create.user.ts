import { User } from '@/domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const user = new User(this.generateId(), name, email);
    await this.userRepository.create(user);
    return user;
  }

  private generateId(): string {
    return uuidv4();
  }
}
