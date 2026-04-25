import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './models/profesional.entity';
import { ProfesionalesService } from './services/profesionales.service';
import { ProfesionalesController } from './controllers/profesionales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional])],
  providers: [ProfesionalesService],
  controllers: [ProfesionalesController],
  exports: [ProfesionalesService],
})
export class ProfesionalesModule {}