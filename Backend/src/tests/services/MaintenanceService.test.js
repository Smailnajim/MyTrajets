import MaintenanceService from '../../services/MaintenanceService.js';
import Maintenances from '../../repositories/Maintenances.js';

jest.mock('../../repositories/Maintenances.js');

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
});
