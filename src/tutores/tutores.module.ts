import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './models/tutor.entity';
import { TutoresService } from './services/tutores.service';
import { TutoresController } from './controllers/tutores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  providers: [TutoresService],
  controllers: [TutoresController],
  exports: [TutoresService],
})
export class TutoresModule {}