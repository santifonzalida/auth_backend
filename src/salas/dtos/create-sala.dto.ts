import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({
    description: 'Nombre de la sala (único en el sistema)',
    example: 'Sala A',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Capacidad máxima de personas en la sala',
    example: 10,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  capacidad: number;

  @ApiPropertyOptional({
    description: 'Descripción o uso previsto de la sala',
    example: 'Sala de terapia grupal con ventilación natural',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;
}