import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../models/paciente.entity';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly repo: Repository<Paciente>,
  ) {}

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const existing = await this.repo.findOne({ where: { dni: dto.dni } });
    if (existing) {
      throw new BadRequestException(
        `Ya existe un paciente registrado con el DNI ${dto.dni}`,
      );
    }
    const paciente = this.repo.create(dto);
    return this.repo.save(paciente);
  }

  async findById(id: string): Promise<Paciente> {
    const paciente = await this.repo.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    }
    return paciente;
  }
}