import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { ResearcherService } from '../../src/researcher/researcher.service';
import { ResearcherRepository } from '../../src/researcher/researcher.repository';
import { Researcher } from '../../src/researcher/entities/researcher.entity';
import { NotFoundException } from '@nestjs/common';
import { mockResearcher, researchers } from '../mocks/entities';


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
        jest.spyOn(researcherRepository, 'findAll').mockResolvedValue(researchers);

        const result = await researcherService.findAll();
        expect(result).toEqual(researchers);
    });

    it('should find a researcher by ID', async () => {
        jest.spyOn(researcherRepository, 'findById').mockResolvedValue(mockResearcher);

        const result = await researcherService.findById('1');
        expect(result).toEqual(mockResearcher);
    });

    it('should create a new researcher', async () => {
        jest.spyOn(researcherRepository, 'create').mockResolvedValue(mockResearcher);

        const result = await researcherService.create('Jane Doe');
        expect(result).toEqual(mockResearcher);
    });

    it('should update an existing researcher', async () => {
        const updated = { ...mockResearcher, name: 'Updated Name' };
        jest.spyOn(researcherRepository, 'update').mockResolvedValue(updated);

        const result = await researcherService.update('1', 'Updated Name');
        expect(result).toEqual(updated);
    });

    it('should delete a researcher by ID', async () => {
        jest.spyOn(researcherRepository, 'findById').mockResolvedValue(mockResearcher);
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
