import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';
import { ResearcherModule } from '../researcher/researcher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    ResearcherModule, 
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
