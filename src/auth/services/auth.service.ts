import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RolesService } from '../../roles/services/roles.service';
import { RegisterUserDto } from '../../users/dtos/registerUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async register(dto: RegisterUserDto) {
    const user = await this.usersService.create(dto.email, dto.password);
    const role = await this.rolesService.findByName('USER');
    user.roles = [role];
    await this.usersService.save(user);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException();

    return user;
  }

  async login(user: User) {
    const permissions = user.roles
      .flatMap((role) => role.permissions)
      .map((permission) => permission.name);

    const uniquePermissions = [...new Set(permissions)];

    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      roles: user.roles.map((r) => r.name),
      permissions: uniquePermissions,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
