import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { ProjectService } from '../../src/project/project.service';
import { ProjectRepository } from '../../src/project/project.repository';
import { ResearcherRepository } from '../../src/researcher/researcher.repository';
import { Project } from '../../src/project/entities/project.entity';
import { NotFoundException } from '@nestjs/common';
import { mockResearcher, mockProject, mockProjects } from '../mocks/entities';
import { CreateProjectDto } from '../../src/project/dto/create-project.dto';

jest.mock('../../src/project/project.repository', () => {
    return {
        ProjectRepository: jest.fn().mockImplementation(() => ({
            findAll: jest.fn(),
            findByName: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        })),
    };
});

jest.mock('../../src/researcher/researcher.repository', () => {
    return {
        ResearcherRepository: jest.fn().mockImplementation(() => ({
            findById: jest.fn(),
        })),
    };
});

describe('ProjectService', () => {
    let projectService: ProjectService;
    let projectRepository: ProjectRepository;
    let researcherRepository: ResearcherRepository;

    beforeAll(() => {
        const mockRepo = {} as any;
        projectRepository = new ProjectRepository(mockRepo);
        researcherRepository = new ResearcherRepository(mockRepo);
        projectService = new ProjectService(projectRepository, researcherRepository);
    });

    it('should find all projects', async () => {
        jest.spyOn(projectRepository, 'findAll').mockResolvedValue(mockProjects);

        const projects = await projectService.findAll();
        expect(projects).toEqual(mockProjects);
    });

    it('should find a project by ID', async () => {
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(mockProject);

        const project = await projectService.findById('1');
        expect(project).toEqual(mockProject);
    });

    it('should create a new project', async () => {
        const inputData = {
            id: mockProject.id,
            name: mockProject.name,
            status: mockProject.status,
            geometry: mockProject.geometry,
            researcherId: mockProject.researcher.id,
        };

        jest.spyOn(researcherRepository, 'findById').mockResolvedValue(mockResearcher);
        jest.spyOn(projectRepository, 'create').mockResolvedValue(mockProject);

        const project = await projectService.create(inputData);
        expect(project).toEqual(mockProject);
    });

    it('should update an existing project', async () => {
        jest.spyOn(projectRepository, 'update').mockResolvedValue(mockProject);

        const updatedProject = await projectService.update('1', {
            name: 'Updated Name',
        });
        expect(updatedProject).toEqual(mockProject);
    });

    it('should delete a project by ID', async () => {
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(mockProject);
        jest.spyOn(projectRepository, 'delete').mockResolvedValue();

        await expect(projectService.delete('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if project not found on delete', async () => {
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(null);

        await expect(projectService.delete('non-existent-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if project not found on findById', async () => {
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(null);

        await expect(projectService.findById('non-existent-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if project not found on update', async () => {
        jest.spyOn(projectRepository, 'update').mockResolvedValue(null);

        await expect(projectService.update('non-existent-id', {})).rejects.toThrow(NotFoundException);
    });
});