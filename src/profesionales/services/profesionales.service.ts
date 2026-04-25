import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from '../models/profesional.entity';
import { CreateProfesionalDto } from '../dtos/create-profesional.dto';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional)
    private readonly repo: Repository<Profesional>,
  ) {}

  async create(dto: CreateProfesionalDto): Promise<Profesional> {
    const [byMatricula, byEmail] = await Promise.all([
      this.repo.findOne({ where: { matricula: dto.matricula } }),
      this.repo.findOne({ where: { email: dto.email } }),
    ]);

    if (byMatricula) {
      throw new BadRequestException(
        `Ya existe un profesional con la matrícula ${dto.matricula}`,
      );
    }
    if (byEmail) {
      throw new BadRequestException(
        `Ya existe un profesional con el email ${dto.email}`,
      );
    }

    const profesional = this.repo.create(dto);
    return this.repo.save(profesional);
  }

  async findById(id: string): Promise<Profesional> {
    const profesional = await this.repo.findOne({ where: { id } });
    if (!profesional) {
      throw new NotFoundException(`Profesional con id ${id} no encontrado`);
    }
    return profesional;
  }
}