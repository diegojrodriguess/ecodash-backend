import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';

@Controller('researchers')
export class ResearcherController {
  constructor(private readonly researcherService: ResearcherService) {}

  @Get()
  findAll() {
    return this.researcherService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.researcherService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateResearcherDto) {
    return this.researcherService.create(dto.name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResearcherDto) {
    return this.researcherService.update(id, dto.name);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.researcherService.delete(id);
  }
}
