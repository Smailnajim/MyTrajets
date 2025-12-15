import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../../repositories/Vehicles.js', () => ({
    default: {
        getVehicle_s_PneusKilometrage: jest.fn()
    }
}));

const VehicleService = (await import('../../services/VehicleService.js')).default;
const Vehicles = (await import('../../repositories/Vehicles.js')).default;

describe('VehicleService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getVehicle_s_PneusKilometrage', () => {
        it('should return pneus kilometrage for a vehicle', async () => {
            const mockPneus = [{ serialNumber: 'PN001', kilometrageActuel: 5000 }];
            Vehicles.getVehicle_s_PneusKilometrage.mockResolvedValue(mockPneus);

            const result = await VehicleService.getVehicle_s_PneusKilometrage('v1');
            expect(result).toHaveLength(1);
            expect(result[0].serialNumber).toBe('PN001');
        });
    });
});
