import { InMemoryUserRepository } from '@test/repositories/in.memory.users.repository';
import { CreateUserUseCase } from './create.user';

describe('CreateUserUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user', async () => {
    const user = await createUserUseCase.execute(
      'John Doe',
      'john@example.com'
    );
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
  });
});
