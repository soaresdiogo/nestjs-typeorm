import { User } from '@/domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user.repository';

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
