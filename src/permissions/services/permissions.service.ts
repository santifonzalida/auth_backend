import { Injectable } from '@nestjs/common';
import { Permission } from '../models/permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
  ) {}

  async onModuleInit() {
    await this.createIfNotExists('USER_VIEW', 'Permission to read user data');
    await this.createIfNotExists('USER_CREATE', 'Permission to create users');
    await this.createIfNotExists('USER_DELETE', 'Permission to delete users');
    await this.createIfNotExists('ROLE_ASSIGN', 'Permission to assign role');
  }

  async createIfNotExists(name: string, description?: string) {
    const exists = await this.repo.findOne({ where: { name } });
    if (!exists) {
      await this.repo.save(this.repo.create({ name, description }));
    }
  }
}
