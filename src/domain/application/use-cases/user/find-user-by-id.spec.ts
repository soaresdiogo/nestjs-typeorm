import { User } from '@/domain/enterprise/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in-memory-users-repository';
import { FindUserByIdUseCase } from './find-user-by-id';

describe('FindUserByIdUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let findUserByIdUseCase: FindUserByIdUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
  });

  it('should find a user by ID', async () => {
    const user = new User('1', 'Jane Doe', 'jane@example.com');
    await userRepository.create(user);
    const foundUser = await findUserByIdUseCase.execute('1');
    expect(foundUser).toEqual(user);
  });
});
