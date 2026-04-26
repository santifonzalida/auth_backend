import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './models/sala.entity';
import { SalasService } from './services/salas.service';
import { SalasController } from './controllers/salas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sala])],
  providers: [SalasService],
  controllers: [SalasController],
  exports: [SalasService],
})
export class SalasModule {}