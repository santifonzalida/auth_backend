import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutor } from '../models/tutor.entity';
import { CreateTutorDto } from '../dtos/create-tutor.dto';

@Injectable()
export class TutoresService {
  constructor(
    @InjectRepository(Tutor)
    private readonly repo: Repository<Tutor>,
  ) {}

  async create(dto: CreateTutorDto): Promise<Tutor> {
    const existing = await this.repo.findOne({ where: { dni: dto.dni } });
    if (existing) {
      throw new BadRequestException(
        `Ya existe un tutor registrado con el DNI ${dto.dni}`,
      );
    }
    const tutor = this.repo.create(dto);
    return this.repo.save(tutor);
  }

  async findAll(): Promise<Tutor[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Tutor> {
    const tutor = await this.repo.findOne({ where: { id } });
    if (!tutor) {
      throw new NotFoundException(`Tutor con id ${id} no encontrado`);
    }
    return tutor;
  }
}