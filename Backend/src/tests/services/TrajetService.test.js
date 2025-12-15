import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Define mocks BEFORE imports
jest.unstable_mockModule('../../repositories/Trajets.js', () => ({
    default: {
        findOneById: jest.fn(),
        findAll: jest.fn()
    }
}));

jest.unstable_mockModule('../../repositories/Vehicles.js', () => ({
    default: {
        getPneuKilometrageWithItsVehicles: jest.fn()
    }
}));

// Dynamic imports
const TrajetService = (await import('../../services/TrajetService.js')).default;
const Trajets = (await import('../../repositories/Trajets.js')).default;

describe('TrajetService Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getTrajet', () => {
        it('should return trajet if user is admin', async () => {
            const mockTrajet = { _id: 't1', chauffeurId: { _id: 'c1' } };
            const mockUser = { _id: 'u1', roleId: { name: 'admin' } };

            Trajets.findOneById.mockResolvedValue(mockTrajet);

            const result = await TrajetService.getTrajet('t1', mockUser);
            expect(result).toEqual(mockTrajet);
        });

        it('should throw 403 if chauffeur access another chauffeur trajet', async () => {
            const mockTrajet = { _id: 't1', chauffeurId: { _id: 'c2' } };
            const mockUser = { _id: 'c1', roleId: { name: 'chauffeur' } };

            Trajets.findOneById.mockResolvedValue(mockTrajet);

            await expect(TrajetService.getTrajet('t1', mockUser))
                .rejects
                .toThrow('You are not authorized to view this trajet');
        });

        it('should return trajet if chauffeur access his own trajet', async () => {
            const mockTrajet = { _id: 't1', chauffeurId: { _id: 'c1', toString: () => 'c1' } }; // Mock toString for safety if code uses it
            const mockUser = { _id: 'c1', roleId: { name: 'chauffeur' }, toString: () => 'c1' };

            Trajets.findOneById.mockResolvedValue(mockTrajet);

            const result = await TrajetService.getTrajet('t1', mockUser);
            expect(result).toEqual(mockTrajet);
        });
    });
});
