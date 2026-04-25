import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { CreateSalaDto } from '../dtos/create-sala.dto';
import { SalasService } from '../services/salas.service';

@ApiTags('Salas')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar una nueva sala' })
  @ApiResponse({
    status: 201,
    description: 'Sala registrada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Nombre de sala ya registrado o datos de entrada inválidos',
  })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  create(@Body() dto: CreateSalaDto) {
    return this.salasService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sala por ID' })
  @ApiParam({ name: 'id', description: 'ID numérico de la sala', example: 1 })
  @ApiResponse({ status: 200, description: 'Sala encontrada' })
  @ApiResponse({ status: 400, description: 'ID no es un número válido' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.findById(id);
  }
}