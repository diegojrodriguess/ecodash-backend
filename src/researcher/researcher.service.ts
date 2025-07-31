import { Injectable, NotFoundException } from '@nestjs/common';
import { ResearcherRepository } from './researcher.repository';
import { Researcher } from './entities/researcher.entity';

@Injectable()
export class ResearcherService {
  constructor(private readonly researcherRepo: ResearcherRepository) {}

  async findAll(): Promise<Researcher[]> {
    return this.researcherRepo.findAll();
  }

  async findById(id: string): Promise<Researcher> {
    const researcher = await this.researcherRepo.findById(id);
    if (!researcher) {
      throw new NotFoundException(`Researcher with ID '${id}' not found.`);
    }
    return researcher;
  }

  async findByName(name: string): Promise<Researcher[]> {
    return this.researcherRepo.findByName(name);
  }

  async create(name: string): Promise<Researcher> {
    return this.researcherRepo.create(name);
  }

  async update(id: string, name: string): Promise<Researcher> {
    const updated = await this.researcherRepo.update(id, name);
    if (!updated) {
      throw new NotFoundException(
        `Cannot update. Researcher with ID '${id}' not found.`,
      );
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const researcher = await this.researcherRepo.findById(id);
    if (!researcher) {
      throw new NotFoundException(
        `Cannot delete. Researcher with ID '${id}' not found.`,
      );
    }
    await this.researcherRepo.delete(id);
  }
}
