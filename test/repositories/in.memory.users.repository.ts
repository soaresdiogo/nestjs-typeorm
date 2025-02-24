import { UserRepository } from '@/domain/application/repositories/user.repository';
import { User } from '@/domain/enterprise/entities/user';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
