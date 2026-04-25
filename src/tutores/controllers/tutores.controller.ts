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
import { CreateTutorDto } from '../dtos/create-tutor.dto';
import { TutoresService } from '../services/tutores.service';

@ApiTags('Tutores')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo tutor' })
  @ApiResponse({
    status: 201,
    description: 'Tutor registrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'DNI ya registrado o datos de entrada inválidos',
  })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  create(@Body() dto: CreateTutorDto) {
    return this.tutoresService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tutor por ID' })
  @ApiParam({ name: 'id', description: 'UUID del tutor', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Tutor encontrado' })
  @ApiResponse({ status: 404, description: 'Tutor no encontrado' })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  @ApiResponse({ status: 403, description: 'Rol insuficiente' })
  findById(@Param('id') id: string) {
    return this.tutoresService.findById(id);
  }
}