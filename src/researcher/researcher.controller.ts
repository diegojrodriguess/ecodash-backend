import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ResearcherService } from './researcher.service';

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
  create(@Body('name') name: string) {
    return this.researcherService.create(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.researcherService.update(id, name);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.researcherService.delete(id);
  }
}
