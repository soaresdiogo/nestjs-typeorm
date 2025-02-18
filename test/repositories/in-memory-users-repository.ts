import { UserRepository } from '@/domain/application/repositories/user-repository';
import { Task } from '@/domain/enterprise/entities/task';
import { User } from '@/domain/enterprise/entities/user';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
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

  async findTaskById(userId: string, taskId: string): Promise<Task | null> {
    const user = await this.findById(userId);
    if (!user) return null;
    return user.tasks.find((task) => task.id === taskId) || null;
  }

  async findAllTasks(userId: string): Promise<Task[]> {
    const user = await this.findById(userId);
    return user ? user.tasks : [];
  }
}
