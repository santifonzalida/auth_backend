import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from '../models/sala.entity';
import { CreateSalaDto } from '../dtos/create-sala.dto';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly repo: Repository<Sala>,
  ) {}

  async create(dto: CreateSalaDto): Promise<Sala> {
    const existing = await this.repo.findOne({ where: { nombre: dto.nombre } });
    if (existing) {
      throw new BadRequestException(
        `Ya existe una sala con el nombre "${dto.nombre}"`,
      );
    }
    const sala = this.repo.create(dto);
    return this.repo.save(sala);
  }

  async findAll(): Promise<Sala[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Sala> {
    const sala = await this.repo.findOne({ where: { id } });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrada`);
    }
    return sala;
  }
}