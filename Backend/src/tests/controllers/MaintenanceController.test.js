import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock dependencies BEFORE imports
jest.unstable_mockModule('../../services/MaintenanceService.js', () => ({
    default: {
        createMaintenance: jest.fn(),
        updateMaintenance: jest.fn(),
        getAllMaintenances: jest.fn(),
        getFleetStatus: jest.fn()
    }
}));

jest.unstable_mockModule('express-validator', () => ({
    matchedData: jest.fn()
}));

// Dynamic imports
const MaintenanceController = (await import('../../controllers/MaintenanceController.js')).default;
const MaintenanceService = (await import('../../services/MaintenanceService.js')).default;
const { matchedData } = await import('express-validator');

describe('MaintenanceController Unit Tests', () => {

    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('createMaintenance', () => {
        it('should call service with validated data and return 201', async () => {
            const mockValidatedData = {
                vehicleId: '123',
                type: 'vidange',
                kmAtMaintenance: 5000
            };
            const mockCreatedMaintenance = {
                _id: '999',
                ...mockValidatedData
            };

            matchedData.mockReturnValue(mockValidatedData);
            MaintenanceService.createMaintenance.mockResolvedValue(mockCreatedMaintenance);

            await MaintenanceController.createMaintenance(req, res);

            expect(matchedData).toHaveBeenCalledWith(req);
            expect(MaintenanceService.createMaintenance).toHaveBeenCalledWith(mockValidatedData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                data: mockCreatedMaintenance
            }));
        });
    });

    describe('getFleetStatus', () => {
        it('should return 200 and fleet status', async () => {
            const mockStatus = [{ vehicle: 'v1', status: 'good' }];
            MaintenanceService.getFleetStatus.mockResolvedValue(mockStatus);

            await MaintenanceController.getFleetStatus(req, res);

            expect(MaintenanceService.getFleetStatus).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                data: mockStatus
            }));
        });
    });
});
