import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from './models/reporte.entity';
import { ReportesService } from './services/reportes.service';
import { ReportesController } from './controllers/reportes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte])],
  providers: [ReportesService],
  controllers: [ReportesController],
  exports: [ReportesService],
})
export class ReportesModule {}