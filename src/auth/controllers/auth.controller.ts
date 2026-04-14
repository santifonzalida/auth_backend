import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../../users/dtos/registerUserDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Email ya está en uso' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Email ya está en uso' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );
    const loginResponse = await this.authService.login(user);
    return {
      ruta: '/dashboard',
      codigoHttp: HttpStatus.OK,
      exito: true,
      mensaje: 'Inicio de sesión exitoso',
      ...loginResponse,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  @Get('admin-data')
  getAdminData() {
    return 'Solo admin puede ver esto';
  }
}
