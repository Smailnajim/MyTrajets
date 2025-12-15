import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../../repositories/Roles.js', () => ({
    default: {
        findOneAndUpdatePermissions: jest.fn()
    }
}));

jest.unstable_mockModule('../../enums/permitions_roles.js', () => ({
    default: {
        admin: ['read', 'write', 'delete'],
        chauffeur: ['read']
    }
}));

const RoleService = (await import('../../services/RoleService.js')).default;
const Roles = (await import('../../repositories/Roles.js')).default;

describe('RoleService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('syncPermissions', () => {
        it('should sync permissions for roles', async () => {
            Roles.findOneAndUpdatePermissions.mockResolvedValue({ name: 'admin', permissions: ['read', 'write', 'delete'] });

            const results = await RoleService.syncPermissions();

            expect(Roles.findOneAndUpdatePermissions).toHaveBeenCalled();
            expect(results.length).toBeGreaterThan(0);
        });
    });
});
