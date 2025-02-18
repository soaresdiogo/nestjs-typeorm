import { User } from '@/domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user-repository';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
