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
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { PacientesService } from '../services/pacientes.service';

@ApiTags('Pacientes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente registrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'DNI ya registrado o datos de entrada inválidos',
  })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  create(@Body() dto: CreatePacienteDto) {
    return this.pacientesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes' })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiParam({ name: 'id', description: 'UUID del paciente', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  findById(@Param('id') id: string) {
    return this.pacientesService.findById(id);
  }
}