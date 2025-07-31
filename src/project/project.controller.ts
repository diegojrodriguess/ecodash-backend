import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects or filter by name' })
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({ status: 200, description: 'List of projects' })
  findAll(@Query('name') name?: string) {
    if (name) return this.projectService.findByName(name);
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Project found' })
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'Project created' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: 'Project updated' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 204, description: 'Project deleted' })
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}