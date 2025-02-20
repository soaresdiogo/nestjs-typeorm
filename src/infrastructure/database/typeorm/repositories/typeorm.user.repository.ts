import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@/domain/application/repositories/user.repository';
import { User } from '@/domain/enterprise/entities/user';
import { UserEntity } from '../entities/user.entity';
import { TypeORMUserMapper } from '../mappers/typeorm.user.mapper';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(user: User): Promise<void> {
    const userEntity = TypeORMUserMapper.toTypeORM(user);
    await this.repository.save(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!userEntity) {
      return null;
    }

    return TypeORMUserMapper.toDomain(userEntity);
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.repository.find({
      relations: ['tasks'],
    });

    return userEntities.map(TypeORMUserMapper.toDomain);
  }
}
