import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../models/role.entity';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.createIfNotExists('USER');
    await this.createIfNotExists('ADMIN');
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

  async createIfNotExists(name: string) {
    const role = await this.repo.findOne({ where: { name } });
    if (!role) {
      await this.repo.save(this.repo.create({ name }));
    }
  }
}
