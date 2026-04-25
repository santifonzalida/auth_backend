import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReporteDto {
  @ApiProperty({
    description: 'Tipo de reporte a generar',
    example: 'PACIENTES',
    enum: ['PACIENTES', 'PROFESIONALES', 'SALAS', 'TUTORES', 'GENERAL'],
  })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiPropertyOptional({
    description: 'Descripción o notas adicionales sobre el reporte',
    example: 'Reporte mensual de pacientes activos',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Fecha de inicio del período en formato ISO 8601',
    example: '2026-01-01',
  })
  @IsDateString()
  fechaDesde: string;

  @ApiProperty({
    description: 'Fecha de fin del período en formato ISO 8601',
    example: '2026-01-31',
  })
  @IsDateString()
  fechaHasta: string;
}