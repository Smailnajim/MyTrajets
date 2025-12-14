import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../../repositories/Maintenances.js', () => ({
    default: {
        createMaintenance: jest.fn(),
        findLatestByVehicleAndType: jest.fn(),
    }
}));

jest.unstable_mockModule('../../repositories/Vehicles.js', () => ({
    default: {
        findOneById: jest.fn(),
        findAll: jest.fn()
    }
}));

jest.unstable_mockModule('../../repositories/MaintenanceRules.js', () => ({
    default: {
        findByVehicleType: jest.fn()
    }
}));

const MaintenanceService = (await import('../../services/MaintenanceService.js')).default;
const Maintenances = (await import('../../repositories/Maintenances.js')).default;
const Vehicles = (await import('../../repositories/Vehicles.js')).default;
const MaintenanceRules = (await import('../../repositories/MaintenanceRules.js')).default;

describe('MaintenanceService Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createMaintenance', () => {
        it('should create a maintenance record via repository', async () => {
            const mockData = {
                vehicleId: '507f1f77bcf86cd799439011',
                type: 'vidange',
                kmAtMaintenance: 10000,
                description: 'Vidange régulière'
            };
            const expectedResponse = {
                _id: '507f1f77bcf86cd799439012',
                ...mockData,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            Maintenances.createMaintenance.mockResolvedValue(expectedResponse);
            const result = await MaintenanceService.createMaintenance(mockData);
            expect(Maintenances.createMaintenance).toHaveBeenCalledTimes(1);
            expect(Maintenances.createMaintenance).toHaveBeenCalledWith(mockData);
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('checkVehicleStatus', () => {
        it('should return "overdue" status when mileage exceeds interval', async () => {
            const vehicleId = '123';
            const mockVehicle = {
                _id: vehicleId,
                type: 'camion',
                kilometrageTotal: 25000
            };
            const mockRule = {
                type: 'vidange',
                vehicleType: 'camion',
                intervalKm: 10000
            };
            const mockLastMaintenance = {
                kmAtMaintenance: 10000
            };

            Vehicles.findOneById.mockResolvedValue(mockVehicle);
            MaintenanceRules.findByVehicleType.mockResolvedValue([mockRule]);
            Maintenances.findLatestByVehicleAndType.mockResolvedValue(mockLastMaintenance);

            const result = await MaintenanceService.checkVehicleStatus(vehicleId);

            expect(result.report[0].status).toBe('overdue');
            expect(result.report[0].distanceSince).toBe(15000);
        });

        it('should return "good" status when mileage is within limits', async () => {
            const vehicleId = '123';
            const mockVehicle = { _id: vehicleId, type: 'camion', kilometrageTotal: 15000 };
            const mockRule = { type: 'vidange', vehicleType: 'camion', intervalKm: 10000 };
            const mockLastMaintenance = { kmAtMaintenance: 10000 };

            Vehicles.findOneById.mockResolvedValue(mockVehicle);
            MaintenanceRules.findByVehicleType.mockResolvedValue([mockRule]);
            Maintenances.findLatestByVehicleAndType.mockResolvedValue(mockLastMaintenance);

            const result = await MaintenanceService.checkVehicleStatus(vehicleId);

            expect(result.report[0].status).toBe('good');
        });
    });
});
