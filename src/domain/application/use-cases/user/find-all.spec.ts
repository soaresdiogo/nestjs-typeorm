import { User } from '@/domain/enterprise/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in-memory-users-repository';
import { FindAllUsersUseCase } from './find-all';

describe('FindAllUsersUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findAllUsersUseCase: FindAllUsersUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
  });

  it('should find all users', async () => {
    await userRepository.create(new User('1', 'User 1', 'user1@example.com'));
    await userRepository.create(new User('2', 'User 2', 'user2@example.com'));
    const users = await findAllUsersUseCase.execute();
    expect(users.length).toBe(2);
  });
});
