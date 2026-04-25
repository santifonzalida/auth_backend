import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = this.repo.create({
      email,
      password: hash,
    });

    return this.repo.save(user);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async save(user: User) {
    return this.repo.save(user);
  }

  async findById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.repo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({
      where: { email },
      relations: ['roles', 'roles.permissions'], // Carga roles y permisos asociados
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmailWithRolesAndPermissions(email: string) {
    return this.repo.findOne({
      where: { email },
      relations: {
        roles: {
          permissions: true,
        },
      },
    });
  }
}
