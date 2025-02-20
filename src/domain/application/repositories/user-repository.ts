import { User } from '@/domain/enterprise/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
