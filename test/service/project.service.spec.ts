import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { ProjectService } from '../../src/project/project.service';
import { ProjectRepository } from '../../src/project/project.repository';
import { Project } from '../../src/project/entities/project.entity';
import { Researcher } from '../../src/researcher/entities/researcher.entity';
import { NotFoundException } from '@nestjs/common';

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

describe('ProjectService', () => {
    let projectService: ProjectService;
    let projectRepository: ProjectRepository;

    beforeAll(() => {
        const mockRepo = {} as any;
        projectRepository = new ProjectRepository(mockRepo);
        projectService = new ProjectService(projectRepository);
    });

    it('should find all projects', async () => {
        const mockProjects: Project[] = [
            {
                id: '1',
                name: 'Project One',
                researcher: new Researcher(),
                status: '',
                geometry: undefined,
                createdAt: undefined,
            },
            {
                id: '2',
                name: 'Project Two',
                researcher: new Researcher(),
                status: '',
                geometry: undefined,
                createdAt: undefined,
            },
        ];
        jest.spyOn(projectRepository, 'findAll').mockResolvedValue(mockProjects);

        const projects = await projectService.findAll();
        expect(projects).toEqual(mockProjects);
    });

    it('should find a project by ID', async () => {
        const mockProject: Project = {
            id: '1',
            name: 'Project One',
            researcher: new Researcher(),
            status: 'active',
            geometry: {},
            createdAt: new Date(),
        };
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(mockProject);

        const project = await projectService.findById('1');
        expect(project).toEqual(mockProject);
    });

    it('should create a new project', async () => {
        const mockProject: Project = {
            id: '1',
            name: 'Project One',
            researcher: new Researcher(),
            status: 'active',
            geometry: {},
            createdAt: new Date(),
        };

        jest.spyOn(projectRepository, 'create').mockResolvedValue(mockProject);

        const project = await projectService.create(mockProject);
        expect(project).toEqual(mockProject);
    });

    it('should update an existing project', async () => {
        const mockProject: Project = {
            id: '1',
            name: 'Updated Project',
            researcher: new Researcher(),
            status: 'active',
            geometry: {},
            createdAt: new Date(),
        };

        jest.spyOn(projectRepository, 'update').mockResolvedValue(mockProject);

        const updatedProject = await projectService.update('1', mockProject);
        expect(updatedProject).toEqual(mockProject);
    });

    it('should delete a project by ID', async () => {
        jest.spyOn(projectRepository, 'delete').mockResolvedValue();

        await expect(projectService.delete('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if project not found on delete', async () => {
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(null);

        await expect(projectService.delete('non-existent-id'))
            .rejects
            .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if project not found on findById', async () => {
        jest.spyOn(projectRepository, 'findById').mockResolvedValue(null);

        await expect(projectService.findById('non-existent-id'))
            .rejects
            .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if project not found on update', async () => {
        jest.spyOn(projectRepository, 'update').mockResolvedValue(null);

        await expect(projectService.update('non-existent-id', {} as Project))
            .rejects
            .toThrow(NotFoundException);
    });
});
