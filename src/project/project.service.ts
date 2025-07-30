import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepo.findAll();
  }

  async findByName(name: string): Promise<Project[]> {
    return this.projectRepo.findByName(name);
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepo.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID '${id}' not found.`);
    }
    return project;
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    return this.projectRepo.create(projectData);
  }

  async update(id: string, projectData: Partial<Project>): Promise<Project> {
    const updated = await this.projectRepo.update(id, projectData);
    if (!updated) {
      throw new NotFoundException(
        `Cannot update. Project with ID '${id}' not found.`,
      );
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const project = await this.projectRepo.findById(id);
    if (!project) {
      throw new NotFoundException(
        `Cannot delete. Project with ID '${id}' not found.`,
      );
    }
    await this.projectRepo.delete(id);
  }
}
