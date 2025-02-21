import { User } from '@/domain/enterprise/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in.memory.users.repository';
import { FindAllUsersUseCase } from './find.all';

describe('FindAllUsersUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findAllUsersUseCase: FindAllUsersUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
  });

  it('should find all users', async () => {
    await userRepository.create(
      new User({ id: '1', name: 'User 1', email: 'user1@example.com' })
    );
    await userRepository.create(
      new User({ id: '2', name: 'User 3', email: 'user2@example.com' })
    );
    const users = await findAllUsersUseCase.execute();
    expect(users.length).toBe(2);
  });
});
