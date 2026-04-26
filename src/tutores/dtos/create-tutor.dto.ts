import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTutorDto {
  @ApiProperty({ description: 'Nombre del tutor', example: 'Carlos' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Apellido del tutor', example: 'López' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'DNI del tutor (único en el sistema)',
    example: '25678901',
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiPropertyOptional({
    description: 'Email de contacto del tutor',
    example: 'carlos.lopez@email.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+5491188882222',
  })
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ApiProperty({
    description: 'Relación del tutor con el paciente',
    example: 'Padre',
    enum: ['Padre', 'Madre', 'Abuelo/a', 'Hermano/a', 'Otro'],
  })
  @IsString()
  @IsNotEmpty()
  relacion: string;
}