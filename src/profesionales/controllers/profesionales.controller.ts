import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { CreateProfesionalDto } from '../dtos/create-profesional.dto';
import { ProfesionalesService } from '../services/profesionales.service';

@ApiTags('Profesionales')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly profesionalesService: ProfesionalesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo profesional' })
  @ApiResponse({
    status: 201,
    description: 'Profesional registrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Matrícula o email ya registrado, o datos de entrada inválidos',
  })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  create(@Body() dto: CreateProfesionalDto) {
    return this.profesionalesService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un profesional por ID' })
  @ApiParam({ name: 'id', description: 'UUID del profesional', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Profesional encontrado' })
  @ApiResponse({ status: 404, description: 'Profesional no encontrado' })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  findById(@Param('id') id: string) {
    return this.profesionalesService.findById(id);
  }
}