import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './models/role.entity';
import { Permission } from 'src/permissions/models/permissions.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), PermissionsModule],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
