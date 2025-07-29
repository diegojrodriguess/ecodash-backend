import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.repo.find();
  }

  async findByName(name: string): Promise<Project[]> {
    return this.repo.find({ where: { name: ILike(`%${name}%`) } });
  }

  async findById(id: string): Promise<Project | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.repo.create(projectData);
    return this.repo.save(project);
  }

  async update(
    id: string,
    projectData: Partial<Project>,
  ): Promise<Project | null> {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) return null;
    Object.assign(project, projectData);
    return this.repo.save(project);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
