import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfesionalDto {
  @ApiProperty({ description: 'Nombre del profesional', example: 'María' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Apellido del profesional', example: 'González' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Especialidad del profesional',
    example: 'Psicología',
  })
  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @ApiProperty({
    description: 'Número de matrícula profesional (único en el sistema)',
    example: 'MP-12345',
  })
  @IsString()
  @IsNotEmpty()
  matricula: string;

  @ApiProperty({
    description: 'Email del profesional (único en el sistema)',
    example: 'maria.gonzalez@clinica.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+5491155559876',
  })
  @IsString()
  @IsOptional()
  telefono?: string;
}