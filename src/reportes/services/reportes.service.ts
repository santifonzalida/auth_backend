import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from '../models/reporte.entity';
import { CreateReporteDto } from '../dtos/create-reporte.dto';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private readonly repo: Repository<Reporte>,
  ) {}

  async create(dto: CreateReporteDto): Promise<Reporte> {
    const reporte = this.repo.create(dto);
    return this.repo.save(reporte);
  }

  async findById(id: string): Promise<Reporte> {
    const reporte = await this.repo.findOne({ where: { id } });
    if (!reporte) {
      throw new NotFoundException(`Reporte con id ${id} no encontrado`);
    }
    return reporte;
  }
}