import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Researcher } from './entities/researcher.entity';

@Injectable()
export class ResearcherRepository {
  constructor(
    @InjectRepository(Researcher)
    private readonly repo: Repository<Researcher>,
  ) {}

  async findAll(): Promise<Researcher[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Researcher | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Researcher[]> {
    return this.repo.find({ where: { name: ILike(`%${name}%`) } });
  }

  async create(name: string): Promise<Researcher> {
    const researcher = this.repo.create({ name });
    return this.repo.save(researcher);
  }

  async update(id: string, name: string): Promise<Researcher | null> {
    const researcher = await this.repo.findOne({ where: { id } });
    if (!researcher) return null;
    researcher.name = name;
    return this.repo.save(researcher);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
