import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './models/paciente.entity';
import { PacientesService } from './services/pacientes.service';
import { PacientesController } from './controllers/pacientes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  providers: [PacientesService],
  controllers: [PacientesController],
  exports: [PacientesService],
})
export class PacientesModule {}