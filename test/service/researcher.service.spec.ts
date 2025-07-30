import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { ResearcherService } from '../../src/researcher/researcher.service';
import { ResearcherRepository } from '../../src/researcher/researcher.repository';
import { Researcher } from '../../src/researcher/entities/researcher.entity';
import { NotFoundException } from '@nestjs/common';

jest.mock('../../src/researcher/researcher.repository', () => {
    return {
        ResearcherRepository: jest.fn().mockImplementation(() => ({
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        })),
    };
});

describe('ResearcherService', () => {
    let researcherService: ResearcherService;
    let researcherRepository: ResearcherRepository;

    beforeAll(() => {
        const mockRepo = {} as any;
        researcherRepository = new ResearcherRepository(mockRepo);
        researcherService = new ResearcherService(researcherRepository);
    });

    it('should find all researchers', async () => {
        const mockResearchers: Researcher[] = [
            {
                id: '1',
                name: 'Researcher One',
                projects: [],
            },
            {
                id: '2',
                name: 'Researcher Two',
                projects: [],
            },
        ];
        jest
            .spyOn(researcherRepository, 'findAll')
            .mockResolvedValue(mockResearchers);

        const researchers = await researcherService.findAll();
        expect(researchers).toEqual(mockResearchers);
    });

    it('should find a researcher by ID', async () => {
        const mockResearcher: Researcher = {
            id: '1',
            name: 'Researcher One',
            projects: [],
        };
        jest
            .spyOn(researcherRepository, 'findById')
            .mockResolvedValue(mockResearcher);

        const researcher = await researcherService.findById('1');
        expect(researcher).toEqual(mockResearcher);
    });

    it('should create a new researcher', async () => {
        const mockResearcher: Researcher = {
            id: '1',
            name: 'New Researcher',
            projects: [],
        };
        jest
            .spyOn(researcherRepository, 'create')
            .mockResolvedValue(mockResearcher);

        const researcher = await researcherService.create('New Researcher');
        expect(researcher).toEqual(mockResearcher);
    });

    it('should update an existing researcher', async () => {
        const mockResearcher: Researcher = {
            id: '1',
            name: 'Updated Researcher',
            projects: [],
        };
        jest
            .spyOn(researcherRepository, 'update')
            .mockResolvedValue(mockResearcher);

        const updatedResearcher = await researcherService.update(
            '1',
            'Updated Researcher',
        );
        expect(updatedResearcher).toEqual(mockResearcher);
    });

    it('should delete a researcher by ID', async () => {
        jest.spyOn(researcherRepository, 'delete').mockResolvedValue();

        await expect(researcherService.delete('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException when researcher not found', async () => {
        jest.spyOn(researcherRepository, 'findById').mockResolvedValue(null);

        await expect(researcherService.findById('non-existent-id')).rejects.toThrow(
            `Researcher with ID 'non-existent-id' not found.`,
        );
    });

    it('should throw NotFoundException if researcher not found on update', async () => {
        jest.spyOn(researcherRepository, 'update').mockResolvedValue(null);

        await expect(researcherService.update('nonexistent-id', 'New Name'))
            .rejects
            .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if researcher not found on delete', async () => {
        jest.spyOn(researcherRepository, 'findById').mockResolvedValue(null);

        await expect(researcherService.delete('nonexistent-id')).rejects.toThrow(
            `Cannot delete. Researcher with ID 'nonexistent-id' not found.`,
        );
    });
    
    it('should throw NotFoundException if researcher not found on findById', async () => {
        jest.spyOn(researcherRepository, 'findById').mockResolvedValue(null);

        await expect(researcherService.findById('nonexistent-id')).rejects.toThrow(
            `Researcher with ID 'nonexistent-id' not found.`,
        );
    });

});
