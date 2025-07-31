import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Researchers')
@Controller('researchers')
export class ResearcherController {
  constructor(private readonly researcherService: ResearcherService) {}

  @Get()
  @ApiOperation({ summary: 'Get all researchers or filter by name' })
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({ status: 200, description: 'List of researchers' })
  findAll(@Query('name') name?: string) {
    if (name) {
      return this.researcherService.findByName(name);
    }
    return this.researcherService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get researcher by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Researcher found' })
  findById(@Param('id') id: string) {
    return this.researcherService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new researcher' })
  @ApiBody({ type: CreateResearcherDto })
  @ApiResponse({ status: 201, description: 'Researcher created' })
  create(@Body() dto: CreateResearcherDto) {
    return this.researcherService.create(dto.name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a researcher' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateResearcherDto })
  @ApiResponse({ status: 200, description: 'Researcher updated' })
  update(@Param('id') id: string, @Body() dto: UpdateResearcherDto) {
    return this.researcherService.update(id, dto.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a researcher' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 204, description: 'Researcher deleted' })
  delete(@Param('id') id: string) {
    return this.researcherService.delete(id);
  }
}
