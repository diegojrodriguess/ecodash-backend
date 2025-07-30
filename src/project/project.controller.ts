import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    if (name) return this.projectService.findByName(name);
    return this.projectService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Post()
  create(@Body() body: Partial<Project>) {
    return this.projectService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Project>) {
    return this.projectService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
