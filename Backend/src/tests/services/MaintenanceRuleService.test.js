import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../../repositories/MaintenanceRules.js', () => ({
    default: {
        createRule: jest.fn(),
        findByType: jest.fn(),
        findAll: jest.fn()
    }
}));

const MaintenanceRuleService = (await import('../../services/MaintenanceRuleService.js')).default;
const MaintenanceRules = (await import('../../repositories/MaintenanceRules.js')).default;

describe('MaintenanceRuleService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createRule', () => {
        it('should create rule if it does not exist', async () => {
            const mockRule = { type: 'vidange', vehicleType: 'camion' };
            MaintenanceRules.findByType.mockResolvedValue(null);
            MaintenanceRules.createRule.mockResolvedValue({ _id: 'r1', ...mockRule });

            const result = await MaintenanceRuleService.createRule(mockRule);
            expect(result._id).toBe('r1');
        });

        it('should throw 409 if rule already exists', async () => {
            const mockRule = { type: 'vidange', vehicleType: 'camion' };
            MaintenanceRules.findByType.mockResolvedValue({ _id: 'r1' });

            await expect(MaintenanceRuleService.createRule(mockRule))
                .rejects
                .toThrow('Rule for vidange on camion already exists');
        });
    });
});
