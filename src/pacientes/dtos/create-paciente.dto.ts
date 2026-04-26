import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({ description: 'Nombre del paciente', example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Apellido del paciente', example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Fecha de nacimiento en formato ISO 8601',
    example: '2000-05-15',
  })
  @IsDateString()
  fechaNacimiento: string;

  @ApiProperty({
    description: 'DNI del paciente (único en el sistema)',
    example: '30123456',
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiPropertyOptional({
    description: 'Email de contacto del paciente',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+5491155551234',
  })
  @IsString()
  @IsOptional()
  telefono?: string;
}