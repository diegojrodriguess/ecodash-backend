import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearcherController } from './researcher.controller';
import { ResearcherService } from './researcher.service';
import { Researcher } from './entities/researcher.entity';
import { ResearcherRepository } from './researcher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher])],
  controllers: [ResearcherController],
  providers: [ResearcherService, ResearcherRepository],
  exports: [ResearcherService, ResearcherRepository], 
})
export class ResearcherModule {}
